import React from 'react';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Register = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();

    const handleRegister = async() => {
        try {
            const response = await axios.post('http://127.0.0.1:5000/register', {
                email,
                password
            });
            localStorage.setItem('token', response.data.token);
            navigate('/dashboard');
        } catch (error) {
            alert('failure')
        }
        
    }
    return(
        <div>
            <h2>Register</h2>
            <input value={email} placeholder="Email" onChange={e => setEmail(e.target.value)}></input>
            <input value={password} placeholder="Password" onChange={e => setPassword(e.target.value)} type="password"></input>
            <button onClick={handleRegister}>Register</button>
        </div>
    );
};

export default Register;