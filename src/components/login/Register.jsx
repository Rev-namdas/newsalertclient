import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as api from "../../api/apiCalls"
import "./login.css";

export default function Login() {
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const [message, setMessage] = useState("")
	const navigate = useNavigate()

	const handleRegister = async (e) => {
		e.preventDefault()

		const res = await api.register({ username, password })
		setMessage(res.data.message)
		setUsername("")
		setPassword("")
	}

    return (
        <div className="login-container">
            <div className="login-box">
                <span className="login-title">Create Account</span>

                <input
                    className="login-input"
                    type="text"
                    placeholder="Username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    className="login-input"
                    type="text"
                    placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
                />

                <div className="login-btn-group">
                    <button className="register-button" onClick={handleRegister}>Register</button>
                    <button className="login-button" onClick={() => navigate('/')}>Login</button>
                </div>

				{message && <span>{message}</span>}
            </div>
        </div>
    );
}
