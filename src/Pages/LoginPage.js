import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import Login from '../Components/Login/Login';
// import logo from '../Components/Assets/logo1.png'
import suzukilogo from '../../src/Components/Assets/logo-suzu.svg'
import ticketly from '../../src/Components/Assets/ticketly.png'
import ticketly2 from '../../src/Components/Assets/mern.png'


import '../../src/Components/Login/Login.css'
const LoginPage = ({ onLogin }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState(null);

    const handleLogin = ({ username, password }) => {
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUserData(null);
    };

    return (
        <div className='bg_class'>
            <img src={ticketly2} style={{position:"absolute", zIndex:"-10", width:"100%" , height:"100%"}}/>
            <div>
                {/* <img src={logo} alt='logo'></img> */}


            {/* <h2>Hey! Welcome to the login page</h2> */}
            {isLoggedIn ? (
                <div>
                    <p>Welcome, {userData.username}!</p>
                    <button onClick={handleLogout}>Logout</button>
                    <Navigate to="/ticket" /> 
                </div>
            ) : (
                <>
                    <Login onLogin={handleLogin} />
                    {/* <div className="register-link">
                     Don't have an account? <Link to="/register">Register here</Link>
                    </div> */}
                </>
            )}
            </div>
        </div>
    );
};

export default LoginPage;
