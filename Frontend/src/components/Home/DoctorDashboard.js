import React, { useState, useEffect } from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import "../../styles/DocProfile.css";
import "rsuite/dist/rsuite.min.css";
import pic from "../../assets/img/profile.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "../ProfileEdit/EditDoctorProfile";
import axios from "axios";

import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("requests");
  const { id } = useParams();
  const [approvedAppointments, setApprovedAppointments] = useState([]);

  const [doctor, setDoctor] = useState(null);

  const handleAction = async (approvedId, newStatus) => {
    try {
      await axios.patch(
        `http://127.0.0.1:8000/api/approved_appointments/${approvedId}/status`,
        { status: newStatus }
      );

      setApprovedAppointments((prev) =>
        prev.map((appt) =>
          appt.id === approvedId ? { ...appt, status: newStatus } : appt
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update appointment status");
    }
  };

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/doctor/${id}`)
      .then((res) => {
        setDoctor(res.data);
      })
      .catch((err) => {
        console.error("Error fetching doctor:", err);
      });

    axios
      .get(`http://127.0.0.1:8000/api/doctor/${id}/approved_appointments`)
      .then((res) => {
         const today = new Date().toISOString().split("T")[0]; 

          const filtered = res.data.filter((appt) => {
          const apptDate = new Date(appt.appointment_date).toISOString().split("T")[0];
          return apptDate === today;
        });

      const sorted = filtered.sort((a, b) => {
        const dateA = new Date(`${a.appointment_date} ${a.slot}`);
        const dateB = new Date(`${b.appointment_date} ${b.slot}`);
        return dateA - dateB;
      });
        setApprovedAppointments(sorted);
      })
      .catch((err) => console.error(err));
  }, [id]);

  if (!doctor) return <p>No doctor found. Please try again.</p>;

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
              alt={doctor.name}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "/Frontend/src/assets/img/profile.png";
              }}
            />
          </div>
          <div className="profile-info">
            <h1 color="#147C87">Dr {doctor.name}</h1>

            <div className="categories" role="list">
              <span role="listitem">{doctor.gender}</span>
<span role="listitem">{doctor.department?.name}</span>
            </div>
            <div className="address">{doctor.clinic}</div>
            <div className="fees">
              <span>
                <strong>Appointment fee: </strong>
                {doctor.fee}
              </span>
              <span>
                <strong>Consultation fee: </strong>
                {doctor.Cfee}
              </span>
            </div>
            <div className="email">{doctor.email}</div>
          </div>
          <button
            className="edit-btn"
            type="button"
            onClick={() =>
              navigate(`/EditDoctorProfile/${doctor.id}`)}>
            Edit Profile
          </button>
        </section>

        {/* Today's Appointment -Booking Requests */}
        {/* Appointments */}
        <section className="appointments-container" aria-label="Appointments">
          <nav className="tabs" role="tablist">
            <button
              role="tab"
              className={activeTab === "today" ? "active" : ""}
              onClick={() => {
                setActiveTab("today");
                navigate(`/DocProfile/${doctor.id}`);
              }}
            >
              Today Appointments
            </button>
            <button
              role="tab"
              onClick={() => {
                navigate(`/DoctorProfileRequest/${doctor.id}`);
              }}
            >
              Booking Requests
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
              {approvedAppointments.map((appt) => (
                <tr key={appt.id}>
                  <td>{appt.patient?.name}</td>
                  <td>{appt.appointment_date}</td>
                  <td>{appt.slot}</td>
                  <td>{appt.issue}</td>
                  <td>{appt.paymentmethod}</td>
                  <td className="actions">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "5px",
                      }}
                    >
                      {["waiting", "completed", "no-show"].map(
                        (statusOption) => (
                          <button
                            key={statusOption}
                           className={`status-btn ${
  appt.status?.toLowerCase() === statusOption
    ? statusOption === "waiting"
      ? "yellow"
      : statusOption === "completed"
      ? "green"
      : "grey"
    : ""
}`}

                            style={{
                              fontSize: "12px",
                              padding: "3px 8px",
                              minWidth: "60px",
                            }}
                               onClick={() => handleAction(appt.id, statusOption)}

                          >
                            {statusOption.charAt(0).toUpperCase() +
                              statusOption.slice(1)}
                          </button>
                        )
                      )}
                    </div>
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

export default DoctorDashboard;
