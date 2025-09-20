import React, { useState,useEffect } from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import'../../styles/Pending.css';
import 'rsuite/dist/rsuite.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import pic from "../../assets/img/profile.png";

import { Link, useLocation, useNavigate,useParams } from 'react-router-dom';

const Pending = () => {
      const { id } = useParams();
      const [appointments, setAppointments] = useState([]);
      const user = JSON.parse(localStorage.getItem("user"));
      const navigate = useNavigate();
      const [activeTab, setActiveTab] = useState("Pending");
      const[Patient,setPatient]=useState(null);
      const [loading, setLoading] = useState(true);
   
const handleAction = async (apptId, newStatus) => {
  try {
    const res = await axios.patch(`http://localhost:8000/api/appointments/${apptId}/status`, {
      status: newStatus
    });

    setAppointments(prev =>
      prev.map(a =>
        a.id === apptId ? { ...a, status: res.data.appointment.status } : a
      )
    );
  } catch (err) {
    console.error("Error updating status:", err);
    alert("Failed to update appointment status");
  }
};

      useEffect(() => {
  const fetchAppointments = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/patients/${id}/appointments`);
      setAppointments(res.data);
    } catch (err) {
      console.error(err);
    }
  };
  fetchAppointments();
}, [id]);

useEffect(() => {
  const fetchPatient = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/patient/${id}`);
      setPatient(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  fetchPatient();
}, [id]);

if (loading) {
    return <p style={{ textAlign: "center" }}>Loading patient details...</p>;
  }

  if (!Patient) {
    return <p style={{ textAlign: "center", color: "red" }}>Patient not found.</p>;
  }
  return (
    <>
    <Nav />
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto' }}>
      {/* Profile Card */}
        <section className="profile-card" aria-label="Doctor profile card">
        <div className="avatar" aria-hidden="true">
          <img src={pic} alt="Patient"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src ={pic}         }}
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
             onClick={() => navigate(`/PatientProfile/${Patient.id}`)}  >
           Appointments History     
             </button>
          <button
            role="tab"
             onClick={() => navigate(`/Upcoming/${Patient.id}`)} 
          >
            Upcoming Appointments
          </button>
          <button role="tab"
             className={activeTab === "Pending" ? "active" : ""}
                       onClick={() => 
                       {
                        setActiveTab("Pending")
navigate(`/Pending/${Patient.id}`);
                      } 
                       }
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
              <th>Issue</th>
              <th>Payment Method</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>

  {appointments
    .filter(appt => appt.status === "pending")
    .map((appt) => (
      <tr
        key={appt.id}
        className={appt.status === "canceled" ? "canceled" : ""}
      >
        <td><strong>{appt.patient?.name || appt.name}</strong></td>
        <td>{new Date(appt.appointment_date).toLocaleDateString()}</td>
        <td>{appt.slot || "Not selected"}</td>
        <td><strong>{appt.issue}</strong></td>
        <td><strong>{appt.paymentmethod}</strong></td>
        {/* <td className="status">{appt.status}</td>  */}
        <button className="tab pending-tab"style={{
          fontSize: "14px",      // تصغير حجم الخط
          padding: "5px 10px",    // تصغير المساحة الداخلية
          minWidth: "60px",      // عرض أصغر للزرار
        }}>
  Pending
</button>

      </tr>
    ))}
</tbody>


        </table>
      </section>
    </div>
         
    <Footer/>
    </>
  );
};

export default Pending;