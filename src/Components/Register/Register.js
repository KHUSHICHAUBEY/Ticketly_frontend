import React, { useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import './Register.css';
import user_icon from '../Assets/user.png';
import email_icon from '../Assets/email.jpg';
import password_icon from '../Assets/password.png';
import suzukilogo from '../Assets/logo-suzu.svg'
import ticketly from '../Assets/ticketly.png'
const Register = ({ onRegister }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [role, setRole] = useState('');
    const navigate=useNavigate();

  const onRegisteruser=(userData)=>{                       
       fetch("http://localhost:3000/register",{
      method:"POST",
      body:JSON.stringify(userData),
      headers:{
        Accept:"application.json",
        'Content-Type':'application/json'
      }
    })
    .then((res)=>res.json())
    .then((res2)=>{
     // alert(res2.message);
      if(res2?.success){
        navigate("/login");
      }
    });
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    // onRegisteruser({  firstName, lastName, email, password,role });
    onRegisteruser({  firstName, lastName, email, password });
  };

    return (
        <div className='login-container'>
                <div style={{display : "flex", justifyContent:"center", alignItems:"center", gap:"20px"
                }}>
                <img src={suzukilogo} alt="" width={150} style={{marginBottom:"25px"}}/>
                <img src={ticketly} alt="" width={150} style={{marginBottom:"25px"}}/>
                </div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <label style={{gap:"20px", justifyContent: "space-around"}}>
                  <span className='label_clas'>
                    First Name:
                    <img src={user_icon} alt=""/>
                    </span>
                    <input
                        type="text"
                        placeholder="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </label>
                <label style={{gap:"20px", justifyContent: "space-around"}}>
                <span className='label_clas'>
                    Last Name:
                    <img src={user_icon} alt=""/>
                    </span>
                    <input
                        type="text"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </label>
                <label style={{gap:"20px", justifyContent: "space-around"}}>
                <span className='label_clas'>
                    Email ID: 
                    <img src={email_icon} alt=""/>
                    </span>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>
                <label style={{gap:"20px", justifyContent: "space-around"}}>
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
                {/* <label>
          Role:
          <img className='img' src={user_icon} alt=""/>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="">Select Role</option>
            <option value="user">user</option>
            <option value="admin">admin</option>
          </select>
        </label> */}
                <button className='button' type="submit">Register</button>

                <div style={{marginTop:"25px"}}>
                Already have an account? <Link to="/">Login here</Link>
            </div>
            </form>
        </div>
    );
};

export default Register;