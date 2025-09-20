import React, { useState } from 'react';
import loginImage from '../../assets/img/loginImg.png';
import Nav from '../Home/Nav';
import Mainforms from './Mainforms';
import { useNavigate } from 'react-router-dom';

function ForgetPassword() {
    const [showModal, setShowModal] = useState(false);
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const fields = [
        {
            name: 'email',
            type: 'email',
            placeholder: 'Email',
            required: true,
            onChange: (e) => setEmail(e.target.value),
        },
    ];

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const enteredEmail = formData.get('email');
        setEmail(enteredEmail);
        console.log("Sending reset email to:", enteredEmail);

        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const handleResendEmail = () => {
        console.log("Resending reset email to:", email);
        alert(`Password reset email resent to ${email}`);
    };


    return (
        <>
            <Nav />
            <section className="login d-flex align-items-center">
                <div className="container">
                    <div className="login-co row w-100 overflow-hidden align-items-center">
                        <div className="col-lg-6 d-none d-lg-block position-relative p-0 overflow-hidden">
                            <img src={loginImage} className="login-img" alt="Forgot Password" />
                            <div className="position-absolute top-50 start-50 translate-middle text-white text-center">
                                <h2 className="fw-bold mb-3">Forgot Password?</h2>
                                <p>Please enter your email to receive a password reset link.</p>
                            </div>
                        </div>

                        <div className="col-lg-6">
                            <Mainforms
                                title="Reset Password"
                                description="Enter the email address you used to create the account you instructions to reset your password"
                                fields={fields}
                                buttonText="Send Email"
                                onSubmit={handleSubmit}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {showModal && (
                <div
                    className="modal-overlay"
                    onClick={(e) => e.target.classList.contains('modal-overlay') && closeModal()}
                >
                    <div className="modal-box">
                        <span className="close-btn" onClick={closeModal}>
                            &times;
                        </span>
                        <h2>Email Sent</h2>
                        <div className="check-icon">&#10003;</div>
                        <p>
                            We have sent you an email at{" "}
                            <strong className="email-text">{email}</strong>.<br />
                            Check your inbox and follow the instructions to reset your account password.
                        </p>
                        <p className="subtext">
                            Did not receive the email? <a href="#">Resend Email</a>
                            <br />
                            Wrong Email Address? <a href="/change-password">Change Password</a>
                        </p>
                    </div>
                </div>
            )}
        </>
    );
}

export default ForgetPassword;
