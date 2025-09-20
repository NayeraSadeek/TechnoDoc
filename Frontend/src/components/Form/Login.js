import React, { useState } from 'react';
import loginImage from '../../assets/img/loginImg.png';
import Nav from '../Home/Nav';
import Form from './Mainforms';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password:''
    });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    
    const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
        alert("Please fill in all fields.");
        return;
    }

     try {
      const response = await axios.post("http://127.0.0.1:8000/api/login", formData);
            console.log("Login response:", response.data);

            localStorage.setItem("token", response.data.token);
         localStorage.setItem("user", JSON.stringify(response.data.user));

if (response.data.user.role === "doctor") {
    localStorage.setItem("doctorId", response.data.doctor?.id);
    navigate(`/DocProfile/${response.data.doctor?.id}`);
  } 
  // لو مريض
  else if (response.data.user.role === "patient") {
    localStorage.setItem("patientId", response.data.patient?.id);
    navigate(`/PatientProfile/${response.data.patient?.id}`);
  }

} catch (error) {
  console.error("Login failed:", error.response?.data || error.message);
  alert(error.response?.data?.message || "Login failed");
}
};



    const fields = [
        {
            name: 'email',
            type: 'email',
            placeholder: 'Email',
            required: true,
            value: formData.email,
            onChange: handleChange
        },
        {
            name: 'password',
            type: 'password',
            placeholder: 'Password',
            required: true,
            value: formData.password,
            onChange: handleChange
        },
    ];

    return (
        <>
            <Nav />
            <section className="login d-flex align-items-center">
                <div className="container">
                    <div className="login-co row w-100 overflow-hidden align-items-center">
                        {/* الصورة */}
                        <div className="col-lg-6 d-none d-lg-block position-relative p-0 overflow-hidden">
                            <img src={loginImage} className="login-img" alt="Login" />
                            <div className="position-absolute top-50 start-50 translate-middle text-white text-center">
                                <h2 className="fw-bold mb-3">WELCOME BACK!</h2>
                                <p>"Access your account and take care of your health or your patients with ease"</p>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <Form
                                title="Login"
                                description="Welcome back! Enter your details to access your account"
                                fields={fields}
                                showRememberMe={true}
                                forgetPasswordHref="/forget-password"
                                buttonText="Login"
                                onSubmit={handleSubmit}
                                footerText="Don’t have an account?"
                                footerLink="Register"
                                footerLinkHref="/register"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Login;
