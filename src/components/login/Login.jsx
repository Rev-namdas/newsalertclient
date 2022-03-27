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

	const handleLogin = async (e) => {
		e.preventDefault()

        if(username !== "" && password !== ""){
            const res = await api.login({ username, password })
            
            if(res.status === 202){
                setMessage({
                    content: res.data.message,
                    type: "warning"
                })
            }

            if(res.status === 200){
                setUsername("")
                setPassword("")
                
                if(res.data.token) {
                    localStorage.setItem("token", res.data.token)
                    localStorage.setItem("role", res.data.role)
                    localStorage.setItem("client", res.data.client)
        
                    navigate('/dashboard')
                } 
            }
        } else {
            setMessage({
                content: "All field are requried !",
                type: "warning"
            })
        }

	}
	
	return (
        <div style={{ backgroundColor: "#6FB2D2" }} className="login-container">
            <div className="login-box">
                <div className="custom-center">
                    <span className="login-title">Account Login</span>
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
                        <button type="submit" className="login-button" onClick={handleLogin}>Login</button>
                    </div>
                    <div className="custom-center">
                        <span>
                            Don't Have Any Account ?
                            <span className="register-option" onClick={() => navigate('/register')}> Register Now !</span>
                        </span>
                    </div>
                </form>

                <MessageInfo message={message.content} type={message.type} />
            </div>
        </div>
    );
}
