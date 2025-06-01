import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import React from 'react';
const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();

    const handleLogin = async() => {
        try {
            const response = await axios.post('http://127.0.0.1:5000/login', {
                email,
                password
            });
            localStorage.setItem("token", response.data.token)   //stores authentication token in browsers local storage even after page reloads
            navigate('/dashboard');
        } catch (error) {
            alert("Login failed!", error);
        }
        
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


