import React from 'react';
import "../App.css";
import { Link, useNavigate } from 'react-router-dom';

export default function LandingPage() {
    const router = useNavigate();

    return (
        <div className='landingPageContainer'>
            {/* Navbar */}
            <nav>
                <div className='navHeader'>
                    <h2>Apna Video Call</h2>
                </div>
                <div className='navlist'>
                    <p onClick={() => router("/aljk23")}>Join as Guest</p>
                    <p onClick={() => router("/auth")}>Register</p>
                    <div onClick={() => router("/auth")} role='button' className="loginButton">
                        <p>Login</p>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="landingMainContainer">
                {/* Left Content */}
                <div className="heroText">
                    <h1><span style={{ color: "#FF9839" }}>Connect</span> with your loved ones</h1>
                    <p>Cover a distance by Apna Video Call</p>
                    <div role='button' className="getStartedButton">
                        <Link to={"/auth"}>Get Started</Link>
                    </div>
                </div>

                {/* Right Image */}
                <div className="heroImage">
                    <img src="/mobile.png" alt="Mobile Video Call" />
                </div>
            </div>
        </div>
    );
}
