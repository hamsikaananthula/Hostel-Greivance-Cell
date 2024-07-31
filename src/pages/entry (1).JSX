import "./entry.css";
 export default function Entry(){
      return(
        <>
        <header>
        <nav className="navbar">
          <a href="#" className="nav-link">Home</a>
          <a href="#" className="nav-link">Logout</a>
        </nav>
      </header>
      <div className="heading">
      <marquee>Welcome to Grievance Cell</marquee>
      </div>
           <div class="container">
    <div class="row">
        <div class="card">
          <div class="card-header">
            <h5 class="mb-2">Admin</h5>
          </div>
          <div class="card-body">
            <p class="card-text">Welcome, Admin! Please log in to your account.</p>
            <button class="btn">Login</button>
          </div>
        </div>
        <div class="card">
          <div class="card-header">
            <h5 class="mb-2">Student</h5>
          </div>
          <div class="card-body">
            <p class="card-text">Welcome, Student! Please log in to your account.</p>
            <button class="btn">Login</button>
          </div>
        </div>
        <div class="card">
          <div class="card-header">
            <h5 class="mb-2">Worker</h5>
          </div>
          <div class="card-body">
            <p class="card-text">Welcome, Worker! Please log in to your account.</p>
            <button class="btn">Login</button>
          </div>
        </div>
      </div>
    </div>
        </>
      );
 }