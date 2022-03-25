import React from "react";

export default function MessageInfo({ message, type }) {
    return (
        <div style={{ color: `${type === "warning" ? "red" : "green"}` }} className="msg-box">
            {message && <span className="msg">{message}</span>}
        </div>
    );
}
