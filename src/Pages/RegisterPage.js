import React from 'react';
import { Link } from 'react-router-dom';
import Register from '../Components/Register/Register';
import '../../src/Components/Login/Login.css'
import suzukilogo from '../../src/Components/Assets/logo-suzu.svg'
import ticketly from '../../src/Components/Assets/ticketly.png'
// import ticketly from '../Assets/ticketly.png'
// import suzukilogo from '../Assets/logo-suzu.svg'
import ticketly2 from '../../src/Components/Assets/mern.png'

const RegisterPage = () => {
    const handleRegister = (newUser) => {
        console.log('New user registered:', newUser);
    };

    return (
        <div className='bg_class'>
            <img src={ticketly2} style={{position:"absolute", zIndex:"-10", width:"100%" , height:"100%"}}/>

            <div>


            {/* <h2>Register for My App</h2> */}
            <Register onRegister={handleRegister} />

            </div>
        </div>
    );
};

export default RegisterPage;