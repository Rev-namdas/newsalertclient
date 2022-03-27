import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as api from "../../api/apiCalls"
import MessageInfo from "../messageinfo/MessageInfo";
import "./login.css";

export default function Login() {
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const [client, setClient] = useState("")
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
            try {
                const res = await api.register({ username, password, client })
        
                if(res.status === 200){
                    setUsername("")
                    setPassword("")
                    setClient("")
            
                    setMessage({
                        content: res.data.message,
                        type: "success"
                    })
    
                    setTimeout(() => {
                        navigate('/')
                    }, 1000);
                }
            } catch (error) {
                if(error.status === 409){
                    setMessage({
                        content: error.message,
                        type: "warning"
                    })
                }
            }
        }

	}

    return (
        <div style={{ backgroundColor: "#533E85" }} className="login-container">
            <div className="register-box">
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
                    <input
                        className="login-input"
                        type="text"
                        placeholder="Company Name"
                        value={client}
                        onChange={(e) => setClient(e.target.value)}
                    />

                    <div className="login-btn-group">
                        <button type="submit" className="register-button" onClick={handleRegister}>Register</button>
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
