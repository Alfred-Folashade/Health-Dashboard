import { useState } from "react";

const Register = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    return(
        <div>
            <h2>Register</h2>
            <input value={email} placeholder="Email" onChange={e => setEmail(e.target.value)}></input>
            <input value={password} placeholder="Password" onChange={e => setPassword(e.target.value)} type="password"></input>
            <button>Register</button>
        </div>
    );
};

export default Register;