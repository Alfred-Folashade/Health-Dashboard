import { useState } from 'react';

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    return (
        <div>
            <h2>Login</h2>
            <input value={email} onChange ={e => setEmail(e.target.value)} placeholder="Email"></input>
            <input value={password} onChange ={e => setPassword(e.target.value)} placeholder="Password" type="password"></input>
            <button>Log in</button>
        </div>
    );
};

export default Login;