import React, { useState, useEffect } from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import "../../styles/DoctorProfileRequest.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Home/../ProfileEdit/EditDoctorProfile";
import pic from "../../assets/img/profile.png";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const DoctorprofileRequest = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("requests");

  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState([]);

  const handleAction = async (id, newStatus) => {
    try {
      const res = await axios.patch(
        `http://127.0.0.1:8000/api/appointments/${id}/status`,
        { status: newStatus }
      );
      console.log("Status updated:", newStatus);
      setAppointments((prev) =>
      prev.map((appt) =>
        appt.id === id ? { ...appt, status: newStatus } : appt
      )
    );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  useEffect(() => {
    console.log("Doctor ID from URL:", id); // Debug
    axios
      .get(`http://127.0.0.1:8000/api/doctor/${id}`)
      .then((res) => {
        console.log("Doctor data:", res.data); // Debug
        setDoctor(res.data);
        setLoading(false); // stop loading when doctor fetched
      })
      .catch((err) => {
        console.error("Error fetching doctor:", err);
        setLoading(false); //  stop loading even if error
      });
  }, [id]);
  useEffect(() => {
    if (!doctor) return;

    axios
      .get(`http://127.0.0.1:8000/api/appointments?doctor_id=${doctor.id}`)
      .then((res) => {
        console.log("Appointments:", res.data);
        setAppointments(res.data);
      })
      .catch((err) => console.error("Error fetching appointments:", err));
  }, [doctor]);

  if (loading) return <p>Loading...</p>;
  if (!doctor) return <p>Doctor not found</p>;

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
        <div className="doctor-page">
          {/* Profile Card */}
          <section className="profile-card" aria-label="Doctor profile card">
            <div className="avatar" aria-hidden="true">
              <img
                src={pic}
                alt="Portrait of Doctor"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = pic;
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
              onClick={() => navigate("/EditDoctorProfile")}
            >
              Edit Profile
            </button>
          </section>

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
                className={activeTab === "requests" ? "active" : ""}
                onClick={() => setActiveTab("requests")}
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
                {appointments.map((appt) => (
                  <tr
                    key={appt.id}
                    className={appt.status === "canceled" ? "canceled" : ""}
                    aria-disabled={appt.status === "canceled"}
                  >
                    <td>
                      <strong>{appt.patient.name}</strong>
                    </td>
                    <td>
                      {new Date(appt.appointment_date).toLocaleDateString()}
                    </td>
                    <td>{appt.slot || "not"}</td>
                    <td>
                      <strong>{appt.issue}</strong>
                    </td>
                    <td>
                      <strong>{appt.paymentmethod}</strong>
                    </td>
                    <td className="actions">
                      {appt.status === "pending" && (
                        <>
                          <button
                            className="accept"
                            onClick={() => handleAction(appt.id, "approved")}
                          >
                            Accept
                          </button>
                          <button
                            className="cancel"
                            onClick={() => handleAction(appt.id, "canceled")}
                          >
                            Cancel
                          </button>
                        </>
                      )}

                      {appt.status === "approved" && (
                        <button
                          className="accepted"
                          disabled
                          style={{ backgroundColor: "green", color: "white" }}
                        >
                          Accepted
                        </button>
                      )}

                      {appt.status === "canceled" && (
                        <button
                          className="canceled"
                          disabled
                          style={{ backgroundColor: "red", color: "white" }}
                        >
                          Canceled
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DoctorprofileRequest;
