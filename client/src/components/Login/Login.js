import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ authenticateUser }) => {
    let navigate = useNavigate();
    const [userData, setUserData] = useState({
        email: '',
        password: ''
    });
    const [errorData, setErrorData] = useState({ errors: null });

    const { email, password, } = userData;
    const { errors } = errorData;

    const onChange = e => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value
        })
    }

    const loginUser = async () => {
        const newUser = {
            email: email,
            password: password
        }

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            const body = JSON.stringify(newUser);
            const res = await axios.post('http://localhost:3001/api/login', body, config);

            localStorage.setItem('token', res.data.token);
            navigate('/')
        } catch (error) {
            localStorage.removeItem('token');

            setErrorData({
                ...errors,
                errors: error.response.data.errors
            })
        }

        authenticateUser();
    }

    return (
        <div>
            <h2>Log in</h2>
            <div>
                <input 
                    type="text"
                    placeholder='Email'
                    name='email'
                    value={email}
                    onChange={e => onChange(e)} />
            </div>
            <div>
            <input 
                    type="text"
                    placeholder='Password'
                    name='password'
                    value={password}
                    onChange={e => onChange(e)} />
            </div>
            <div>
                <button onClick={() => loginUser()}>Log in</button>
            </div>
            <div>
                {errors && errors.map(error =>
                    <div key={error.msg}>{error.msg}</div>)}
            </div>
        </div>
    )
}

export default Login;