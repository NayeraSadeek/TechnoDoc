import React from "react";
import "../styles/profileForm.css";

function ProfileForm({ type }) {
    return (
        <div className="edit-profile">
            <div className="edit-header">
                <h2>Edit Profile</h2>
                <p>Update your information</p>
            </div>

            {/* Personal Information */}
            <section className="section-box">
                <h3 className="section-title">Personal Information</h3>
                <div className="form-grid">
                    <input type="text" placeholder="Full Name" />
                    <input type="email" placeholder="Email/Phone" />
                    {type === "doctor" && <input type="text" placeholder="Department" />}
                    <select>
                        <option>Gender</option>
                        <option>Male</option>
                        <option>Female</option>
                    </select>
                    <input type="password" placeholder="New Password" />
                    <input type="password" placeholder="Confirm Password" />
                    {type === "doctor" && (
                        <div className="upload-box">
                            <input type="file" id="upload-cert" />
                            <label htmlFor="upload-cert">Upload graduation certificate</label>
                        </div>
                    )}
                </div>
            </section>

            {/* Clinic Details */}
            {type === "doctor" && (
                <section className="section-box">
                    <h3 className="section-title">Clinic Details</h3>
                    <div className="form-grid">
                        <input type="text" placeholder="Change your clinic's address" />
                        <input type="number" placeholder="Update appointment fee" />
                        <input type="number" placeholder="Update consultation fee" />
                        <div className="profile-photo">
                            <label>Change Profile Photo</label>
                            <input type="file" accept="image/*" />
                        </div>
                    </div>
                </section>
            )}

            {/* Availability Schedule */}
            {type === "doctor" && (
                <section className="section-box">
                    <h3 className="section-title">Availability Schedule</h3>
                    <div className="availability">
                        {["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map(
                            (day) => (
                                <div className="schedule-item" key={day}>
                                    <div className="day-row">
                                        <span>{day}</span>
                                        <label className="switch">
                                            <input type="checkbox" />
                                            <span className="slider"></span>
                                        </label>
                                    </div>
                                    <div className="time-inputs">
                                        <input type="time" /> - <input type="time" />
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                </section>
            )}

            <div className="actions">
                <button className="cancel-btn">Cancel</button>
                <button className="save-btn">Save Changes</button>
            </div>
        </div>
    );
}

export default ProfileForm;
