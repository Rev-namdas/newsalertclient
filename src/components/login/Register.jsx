import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as api from "../../api/apiCalls"
import MessageInfo from "../messageinfo/MessageInfo";
import "./login.css";

export default function Login() {
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const [message, setMessage] = useState({
        content: null,
        type: null
    })
	const navigate = useNavigate()

	const handleRegister = async (e) => {
		e.preventDefault()

        if(username === "" || password === ""){
            setMessage({
                content: "All fields are required !",
                type: "warning"
            })
        } else {
            const res = await api.register({ username, password })
    
            if(res.status === 202){
                setMessage({
                    content: res.data.message,
                    type: "warning"
                })
            }
    
            if(res.status === 200){
                setUsername("")
                setPassword("")
        
                setMessage({
                    content: res.data.message,
                    type: "success"
                })
            }
        }

	}

    return (
        <div style={{ backgroundColor: "#533E85" }} className="login-container">
            <div className="login-box">
                <div className="custom-center">
                    <span className="login-title">Create Account</span>
                </div>

                <form>
                    <input
                        className="login-input"
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        className="login-input"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <div className="login-btn-group">
                        <button type="submit" className="register-button" onClick={handleRegister}>Register</button>
                        {/* <button className="login-button" onClick={() => navigate('/')}>Login</button> */}
                    </div>
                </form>
                <div className="alternate-option">
                    <span>
                        Already Have An Account ?
                        <span className="login-option" onClick={() => navigate('/')}> Login Now !</span>
                    </span>
                    
                </div>

				<MessageInfo message={message.content} type={message.type} />
            </div>
        </div>
    );
}
