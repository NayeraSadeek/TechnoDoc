import React, { useState, useEffect } from 'react';
import '../../styles/Nav.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../../assets/img/TechnoDoc.png';
// import profile from '../../assets/img/profile.jpeg';
import pic from "../../assets/img/profile.png";

import { Link, useLocation, useNavigate } from 'react-router-dom';

function Nav() {
    const location = useLocation();
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [profilePhoto, setProfilePhoto] = useState(null);
    const [userName, setUserName] = useState("");
  const [Patient, setPatient] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
  const user = localStorage.getItem("user");
  if (user) {
    const parsedUser = JSON.parse(user);
    setIsLoggedIn(true);
    setProfilePhoto(parsedUser.profilePhoto);
    setUserName(parsedUser.name || "User");

    // If it's a patient, set Patient state
    if (parsedUser.role === "patient") {
      setPatient(parsedUser);
    }
  } else {
    setIsLoggedIn(false);
    setProfilePhoto("/Frontend/src/assets/img/profile.png");
    setUserName("");
  }
}, [location]);


     const handleProfileClick = () => {
  if (!user) {
    navigate("/login");
    return;
  }

  if (user.role === "doctor") {
    const doctorId = localStorage.getItem("doctorId");
    navigate(`/DocProfile/${doctorId}`);
  } else if (user.role === "patient") {
    const patientId = localStorage.getItem("patientId");
    navigate(`/PatientProfile/${patientId}`);
  }
};

    const handleLogout = () => {
        localStorage.removeItem("user");
        setIsLoggedIn(false);
        navigate("/login");
    };

    return (
        <nav className="navbar navbar-expand-lg bg-white shadow-sm custom-navbar px-3 py-2">
            <div className="container-fluid">
                {/* Logo */}
                <a className="navbar-brand" href="/">
                    <img src={logo} alt="TechnoDoc Logo" className='logo-img' />
                </a>

                <button
                    className="navbar-toggler custom-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav mx-auto">
                        <li className="nav-item px-2">
                            <Link className="nav-link " to="/">Home</Link>
                        </li>
                        
                        <li className="nav-item px-2">
                            <Link className="nav-link" to="/About">About</Link>
                        </li>
                        <li className="nav-item px-2">
                            <Link className="nav-link" to="/Services">Services</Link>
                        </li>
                        <li className="nav-item px-2">
                            <Link className="nav-link" to="/Departments">Departments</Link>
                        </li>
                    </ul>
                    {!isLoggedIn ? (
                        <div className="d-flex gap-2">
                            <Link
                                to="/login"
                                className={`btn custom-btn-outline rounded-pill px-4 ${location.pathname === "/login" ? "active" : ""}`}
                            >
                                Login
                            </Link>
                            <Link to="/register" className="btn custom-btn-outline rounded-pill px-4">
                                Register
                            </Link>
                        </div>
                    ) : (
                        <div className="d-flex align-items-center gap-3">
                            <img
                                src={pic}                      
                                    alt="Profile"
                                className="rounded-circle"
                                style={{ width: "40px", height: "40px", objectFit: "cover" }}
                                onClick={handleProfileClick}
                            />
                            <button
                                onClick={handleLogout}
                                className="btn btn-outline-danger btn-sm rounded-pill px-3"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav >
    );
}

export default Nav;
