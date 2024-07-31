import "./loginform.css";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function Dels2(){
    const [username, setUsername] = useState('');
    const message="Student is deleted Successfully"
    const navigate=useNavigate()
    const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
          const response = await axios.delete('http://localhost:8080/dels/'+username)
          console.log(response.status)
          if (response.status === 200) {
            // Handle successful registration (e.g., redirect to login page)
            console.log('Registration successful!');
            setUsername('');// Clear any previous errors
            navigate("/sucf2/Student")
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
                    <input type="submit" value="Delete Student" ></input>
                </div>
            </form>
        </div>
    </div>
    </>
    );
}