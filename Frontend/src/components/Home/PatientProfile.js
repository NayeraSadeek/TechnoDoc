import React, { useState, useEffect } from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import "../../styles/PatientProfile.css";
import "rsuite/dist/rsuite.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import pic from "../../assets/img/profile.png";

import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

const handleAction = (id, action) => {
  console.log(`Appointment ${id} was ${action}`);
};

const PatientProfile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("History");
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [Patient, setPatient] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchPattient = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/patient/${id}`);
        setPatient(res.data);
      } catch (err) {
        console.error("Error fetching patient:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPattient();
  }, [id]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/patient/${id}/appointments-history`
        );
        setAppointments(res.data);
      } catch (err) {
        console.error("Error fetching appointments:", err);
      }
    };
    fetchAppointments();
  }, [id]);

  if (loading) {
    return <p style={{ textAlign: "center" }}>Loading patient details...</p>;
  }

  if (!Patient) {
    return (
      <p style={{ textAlign: "center", color: "red" }}>Patient not found.</p>
    );
  }

  return (
    <>
      <Nav />
      <div
        style={{
          fontFamily: "Arial, sans-serif",
          maxWidth: "800px",
          margin: "0 auto",
        }}
      >
        {/* Profile Card */}
        <section className="profile-card" aria-label="Doctor profile card">
          <div className="avatar" aria-hidden="true">
            <img
              src={pic}
              alt="Patient"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = { pic };
              }}
            />
          </div>
          <div className="profile-info">
            <h1>{Patient?.name}</h1>
            <div className="categories" role="list">
              <span role="listitem">{Patient?.gender}</span>
            </div>
            <div className="age">{Patient?.age}</div>
            <span className="phone">{Patient?.phone}</span>
            <div className="email">{Patient?.email}</div>
          </div>
          <button
            className="edit-btn"
            type="button"
            onClick={() => navigate(`/EditPatientProfile/${Patient.id}`)}
          >
            Edit Profile
          </button>
        </section>

        {/* Appointments */}
        <section className="appointments-container" aria-label="Appointments">
          <nav className="tabs" role="tablist">
            <button
              role="tab"
              className={activeTab === "History" ? "active" : ""}
            onClick={() => {
  setActiveTab("History");
  navigate(`/PatientProfile/${Patient.id}`);
}}

              
            >
              Appointments History
            </button>

            <button
              role="tab"
              onClick={() => {
                navigate(`/Upcoming/${Patient.id}`);
              }}
            >
              Upcoming Appointments
            </button>

            <button
              role="tab"
              onClick={() => {
                navigate(`/Pending/${Patient.id}`);
              }}>
              Pending Appointments
            </button>
          </nav>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Date</th>
                <th>Time</th>
                <th>Issue</th>
                <th>Payment Method</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appt) => (
                <tr
                  key={appt.id}
                  className={appt.status === "Canceled" ? "canceled" : ""}
                  aria-disabled={appt.status === "Canceled"}
                >
                  <td>
                    <strong>Dr {appt.name}</strong>
                  </td>
                  <td>{appt.appointment_date}</td>
                  <td>{appt.slot}</td>
                  <td>
                    <strong>{appt.issue}</strong>
                  </td>
                  <td>
                    <strong>{appt.paymentmethod}</strong>
                  </td>
                  <td className="actions">
                    <button
                      className={`status-btn ${
                        appt.status === "Completed"
                          ? "green"
                          : appt.status === "Canceled"
                          ? "red"
                          : "grey"
                      }`}

                      // onClick={() => handleAction(appt.id, appt.status)}
                    >
                      {appt.status === "Completed"
                        ? "Completed"
                        : appt.status === "Canceled"
                        ? "Canceled"
                        : "No-show"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>

      <Footer />
    </>
  );
};

export default PatientProfile;
