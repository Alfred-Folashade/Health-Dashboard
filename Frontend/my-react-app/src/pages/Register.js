import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();

    const handleRegister = () => {
        navigate('/dashboard');
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