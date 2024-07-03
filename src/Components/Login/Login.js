import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';
import password_icon from '../Assets/password.png';
import user_icon from '../Assets/user.png';
import ticketly from '../Assets/ticketly.png'
import suzukilogo from '../Assets/logo-suzu.svg'

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate('');

    const handleLogin = (userData) => {
      
        fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          Accept:"application.json",
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData),
      })
      .then((res)=>res.json())
      .then((res2)=>{
        
        if(res2?.succsess){
          localStorage.setItem('token',res2?.accessToken);
          navigate("/ticket");
        }
        else{
            alert(res2.message);
        }  
      });
      onLogin(userData);
  };
  const handleSubmit = (e) =>{
    e.preventDefault();
    handleLogin({username, password});
    }

    return (
        <div className='login-container'>
                <div style={{display : "flex", justifyContent:"center", alignItems:"center", gap:"20px"
                }}>
                <img src={suzukilogo} alt="" width={150} style={{marginBottom:"25px"}}/>
                <img src={ticketly} alt="" width={150} style={{marginBottom:"25px"}}/>
                </div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <label style={{gap:"20px"}}>
                  <span className='label_clas'>
                    Username:
                    <img src={user_icon} alt=""/>
                    </span>
                    <input 
                    type="email" 
                    placeholder="Username"
                     value={username}
                      onChange={(e) => setUsername(e.target.value)}
                       required 
                       /> 
                </label>
                <label style={{gap:"20px"}}>
                    <span className='label_clas'>
                    Password:
                    <img src={password_icon} alt=""/>
                    </span>
                    <input 
                    type="password"
                     placeholder="Password" 
                     value={password} 
                     onChange={(e) => setPassword(e.target.value)} 
                     required 
                     />
                </label>
                <button className='button' type="submit">Login</button>
                <div className="register-link" style={{marginTop:"25px"}}>
                     Don't have an account? <Link to="/register">Register here</Link>
                    </div>
            </form>
        </div>
    );
};

export default Login;