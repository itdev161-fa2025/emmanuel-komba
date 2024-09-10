import express from 'express';
import connectDatabase from './config/db';
import { check, validationResult } from 'express-validator';

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
    (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    } else {
        return res.send(req.body);
    }
});

//connection listener
app.listen(3000, () => console.log('Express server running on port 3000'));
