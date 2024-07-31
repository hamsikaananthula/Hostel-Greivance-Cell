import "./loginpage.css";
import React from 'react'
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import axios from 'axios'
import "./error.css";
import image from "./img.jpg"
 function Login(){
    const [username, setusername] = useState('');
    const [password, setPassword] = useState('');
    const[errormessage,seterror]=useState();
    const navigate = useNavigate()
    axios.defaults.withCredentials = true;
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8080/login', {username, password})
        .then(res => {
            console.log("login: " + res.data);
            if(res.data.Status === "Success") {
                   navigate(`/dash/student/${username}`);
                }
                else {
                  setusername('');
                  setPassword('');
                  seterror("Please Check Your credentials");
              }
        }).catch(err => console.log(err))
    }
    useEffect(() => {
      // Clear error message after a timeout (optional)
      if (errormessage) {
        const timeoutId = setTimeout(() => seterror(null), 5000);
        return () => clearTimeout(timeoutId);
      }
    }, [errormessage]);
    const handlec=()=>{
      axios.get("http://localhost:8080/logout").
      then(res=>{
        window.location.href = "/warden/login";
      }).catch(err=>console.log(err));
    }
    function hom(){
      navigate("/");
    }
      return(
        <>
        <header>
        <nav className="navbar88">
          <a href="#"  onClick={hom} className="nav-link">Home</a>
          <a href="#" onClick={handlec} className="nav-link">Logout</a>
        </nav>
      </header>
              <div className="wrapper">
        <div className="title">Login Form</div>
        <div className="title1">
            <img src={image} className="login-image"></img>
            <form onSubmit={handleSubmit}>
         {errormessage && (
          <div className="error-message">
            <span className="warning-icon">⚠️</span> {errormessage}
          </div>
        )}
                <div className="field">
                    <input type="text"
              name="username"
              onChange={(e) => setusername(e.target.value)}></input>
                    <label>Username</label>
                </div>
                <div className="field">
                    <input    type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}></input>
                    <label>Password</label>
                </div>
                <div className="field">
                    <input type="submit" value="Login"></input>
                </div>
            </form>
        </div>
    </div>
        </>
      );
 }
 export default Login