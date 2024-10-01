import express from 'express';
import connectDatabase from './config/db';
import { check, validationResult } from 'express-validator';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import User from './models/User';

//Initialize express application
const app = express();

connectDatabase();

app.us(express.json({ extended: false }));

//API endpoints
app.get('/', (req, res) =>
    res.send('http get request sent to root api endpoint')
);

app.post(
    '/api/users', 
    [
        check('name', 'Please enter your name').not().isEmpty(),
        check('email', 'Please enter a valid email').isEmail(),
        check('password', 'please enter a password with 6 or more characters').length({ min: 6 })
    ],
    async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    } else {
        const { name, email, password } = req.body;
        try {
            let user = await User.findOne({ email: email });
            if (user) {
                return res
                  .status(400)
                  .json({ errors: [{ msg: 'User already exists' }] });
            }

            user = new User({
                name: name,
                email: email,
                password: password
            });

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);

            await user.save();
            res.send('User successfully registered');
        }   catch (error) {
            res.status(500).send('Server error');
        }
    }
});

//connection listener
app.listen(3000, () => console.log('Express server running on port 3000'));
