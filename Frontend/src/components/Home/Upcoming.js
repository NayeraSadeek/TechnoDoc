import React, { useState, useEffect } from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import "../../styles/Upcoming.css";
import "rsuite/dist/rsuite.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import pic from "../../assets/img/profile.png";
import axios from "axios";

import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

const handleAction = (id, action) => {
  console.log(`Appointment ${id} was ${action}`);
};

const Upcoming = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

const [activeTab, setActiveTab] = useState("Upcoming");
  const { id } = useParams();
  const [Patient, setPatient] = useState(null);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/patient/${id}`);
        setPatient(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPatient();
  }, [id]);
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/patient/${id}/approved_appointments`
        );
        setAppointments(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAppointments();
  }, [id]);
  if (!Patient) return <p>Loading patient...</p>;

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
                e.currentTarget.src = pic;
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
  onClick={() =>
    navigate(`/EditPatientProfile/${id}`) 
  }
>
  Edit Profile
</button>
        </section>

        {/* Appointments */}
        <section className="appointments-container" aria-label="Appointments">
          <nav className="tabs" role="tablist">
            <button
              role="tab"
              onClick={() => navigate(`/PatientProfile/${Patient.id}`)}
            >
              Appointments History
            </button>

            <button
              role="tab"
              className={activeTab === "Upcoming" ? "active" : ""}
              onClick={() => setActiveTab("Upcoming")}
            >
              Upcoming Appointments
            </button>
            <button
              role="tab"
              onClick={() => navigate(`/Pending/${Patient.id}`)}
            >
              Pending Appointments
            </button>
          </nav>

          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Date</th>
                <th>Time</th>
                <th>Department</th>
                <th>Payment Method</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appt) => (
                <tr key={appt.id}>
                  <td><strong>Dr {appt.doctor.name}</strong></td>
                  <td>{appt.appointment_date}</td>
                  <td>{appt.slot}</td>
                  <td>{appt.doctor.department}</td>
                  <td>
                    <strong>{appt.paymentmethod}</strong>
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

export default Upcoming;
