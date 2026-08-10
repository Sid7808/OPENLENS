import React from "react";
import LoginForm from "../components/auth/LoginForm";
import LoginBrandPanel from "../components/auth/LoginBrandPanel";
import "./LoginPage.css";

function LoginPage() {
    return (
        <div className="login-page-container">
            {/* LEFT SIDE - Form */}
            <div className="login-left-section">
                <LoginForm />
            </div>

            {/* RIGHT SIDE - Product Message / Brand Panel */}
            <div className="login-right-section">
                <LoginBrandPanel />
            </div>
        </div>
    );
}

export default LoginPage;
