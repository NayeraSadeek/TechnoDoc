import React, { useState } from 'react';
import loginImage from '../../assets/img/loginImg.png';
import Mainforms from './Mainforms';
import Nav from '../Home/Nav';

function ChangePassword() {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const fields = [
        { name: 'newPassword', type: 'password', placeholder: 'New Password', required: true, value: newPassword, onChange: (e) => setNewPassword(e.target.value) },
        { name: 'confirmPassword', type: 'password', placeholder: 'Confirm Password', required: true, value: confirmPassword, onChange: (e) => setConfirmPassword(e.target.value) }
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        alert('Password changed successfully!');
    };

    return (
        <>
            <Nav />
            <section className="login d-flex align-items-center">
                <div className="container">
                    <div className="login-co row w-100 overflow-hidden align-items-center">
                        <div className="col-lg-6 d-none d-lg-block position-relative p-0 overflow-hidden">
                            <img src={loginImage} className="login-img" alt="Change Password" />
                            <div className="position-absolute top-50 start-50 translate-middle text-white text-center">
                                <h2 className="fw-bold mb-3">Change Your Password</h2>
                                <p>Enter your new password to secure your account.</p>
                            </div>
                        </div>

                        <div className="col-lg-6">
                            <Mainforms
                                title="Change Password"
                                description="Enter and confirm your new password."
                                fields={fields}
                                buttonText="Change Password"
                                onSubmit={handleSubmit}
                            />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default ChangePassword;

