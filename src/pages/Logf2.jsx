import "./loginform.css";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
export default function Logf2(){
    const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
    const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
          const response = await axios.post('http://localhost:8080/register', {
            username,
            password,
          });
          console.log(response.status)
          if (response.status === 201) {
            // Handle successful registration (e.g., redirect to login page)
            console.log('Registration successful!');
            setUsername('');
            setPassword(''); // Clear any previous errors
          } 
        } catch (error) {
          console.error('Error during registration:', error);// More user-friendly error
        }
      };
    return(
    <>
       <header>
        <nav className="navbar">
          <a href="#" className="nav-link">Home</a>
          <a href="#" className="nav-link">Logout</a>
        </nav>
      </header>
              <div class="wrapper">
        <div class="title">Enter Details</div>
        <div class="title1">
        <form onSubmit={handleSubmit}>
                <div class="field">
                <input type="text"
        id="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required></input>
                    <label>Username</label>
                </div>
                <div class="field">
                <input type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required ></input>
                    <label>Password</label>
                </div>
                <div class="field">
                    <input type="submit" value="Add student" ></input>
                </div>
            </form>
        </div>
    </div>
    </>
    );
}