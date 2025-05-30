import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import React from 'react';
const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/dashboard');
    };
    return (
        <div>
            <h2>Login</h2>
            <input value={email} onChange ={e => setEmail(e.target.value)} placeholder="Email"></input>
            <input value={password} onChange ={e => setPassword(e.target.value)} placeholder="Password" type="password"></input>
            <button onClick={handleLogin}>Log in</button>
        </div>
    );
};

export default Login;