import React, { useState,useEffect  } from "react";
import { FaUser, FaClinicMedical, FaClock } from "react-icons/fa";
import "../../styles/ProfileEdit.css";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function ProfileForm({ type, onBack }) {

      const { id } = useParams();
      const navigate = useNavigate();

   // Common fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState(""); // patient only
  const [phone, setPhone] = useState(""); // patient only
  const [password, setPassword] = useState("");

  // Doctor-specific fields
  const [department, setDepartment] = useState("");
  const [clinic, setClinic] = useState("");
  const [fee, setFee] = useState("");
  const [Cfee, setCfee] = useState("");
  const [clinicLink, setClinicLink] = useState("");
  const [certificate, setCertificate] = useState(null);
 
   const [doctor, setDoctor] = useState({
    name: "",
    email: "",
    department: "",
    clinic: "",
    fee: "",
    cfee: "",
    clinic_location_link: "",
  });

  const [availability, setAvailability] = useState(
    [
      "Saturday",
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
    ].map((day) => ({
      day,
      active: false,
      times: [{ from: "", to: "" }],
    }))
  );
const [patient, setPatient] = useState({
  name: "",
  email: "",
  age: "",
  gender: "",
  phone: "",
});

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (type === "doctor") {
          const res = await axios.get(`http://127.0.0.1:8000/api/doctors/${id}`);
          const data = res.data;
          setName(data.name || "");
          setEmail(data.email || "");
          setGender(data.gender || "");
          setDepartment(data.department || "");
          setClinic(data.clinic || "");
          setFee(data.fee || "");
          setCfee(data.Cfee || "");
          setClinicLink(data.clinic_location_link || "");
          setCertificate(data.certificate || null);

          // Prefill availability
          if (data.appointments) {
            const updated = availability.map((dayItem) => {
              const slots = data.appointments.filter((a) => a.day === dayItem.day);
              if (slots.length > 0) {
                return {
                  ...dayItem,
                  active: true,
                  times: slots.map((s) => ({ from: s.start_time, to: s.end_time })),
                };
              }
              return dayItem;
            });
            setAvailability(updated);
          }
        }else if (type === "patient") {
const res = await axios.get(`http://127.0.0.1:8000/api/patients/${id}`);
  // console.log("Patient response:", res.data);
const data = res.data;

// const data = res.data.patient; 
          setName(data.name || "");
          setEmail(data.email || "");
          setPhone(data.phone || "");
          setGender(data.gender || "");
          setAge(data.age || "");
        }
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };
    fetchData();

  }, [id, type]); 

  const toggleDay = (index) => {
    const updated = [...availability];
    updated[index].active = !updated[index].active;
    setAvailability(updated);
  };

  const handleTimeChange = (dayIndex, timeIndex, field, value) => {
    const updated = [...availability];
    updated[dayIndex].times[timeIndex][field] = value;
    setAvailability(updated);
  };

  const addTimeSlot = (dayIndex) => {
    const updated = [...availability];
    updated[dayIndex].times.push({ from: "", to: "" });
    setAvailability(updated);
  };
const formattedAvailability = availability
  .filter((day) => day.active)
  .flatMap((day) =>
    day.times.map((time) => ({
      day: day.day,
      from: time.from,
      to: time.to,
    }))
  );

    const handleUpdate = async () => {
    try {
      if (type === "doctor") {
        const payload = {
          name,
          email,
          gender,
          department,
          clinic,
          fee,
          Cfee,
          clinic_location_link: clinicLink,
          certificate,
          availability: formattedAvailability,
        };
        await axios.put(`http://127.0.0.1:8000/api/doctors/${id}`, payload);
        navigate(`/DocProfile/${id}`);
      } else if (type === "patient") {
        const payload = { name, email, gender, age, phone };
        if (password) payload.password = password;

        await axios.put(`http://127.0.0.1:8000/api/patients/${id}`, payload);
        navigate(`/PatientProfile/${id}`);
      }
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Update failed:", error.response?.data || error.message);
      alert("Update failed");
    }
  };

  return (
    <div className="edit-profile">
      <div className="edit-header">
        <span
          className="back-link"
          onClick={() => navigate(-1)}
        >
          ← Back to Profile
        </span>
        <div className="edit-titles">
          <h2>Edit Profile</h2>
          <p>Update your information</p>
        </div>
      </div>

      {/* Personal Information */}
      <section className="section-box">
        <h3 className="section-title">
          <FaUser className="icon" /> Personal Information
        </h3>
        <div className="form-grid">
          <input
            type="text"
            placeholder="Full Name"
            value={name||""}
            onChange={(e) => setName(e.target.value)}
          />
          {type !== "doctor" && 
          <input type="number" placeholder="Age"
           value={age||""} onChange={(e) => setAge(e.target.value)}/>}
          <input
            type="email"
            placeholder="Email"
            value={email||""}
            onChange={(e) => setEmail(e.target.value)}
          />
                    {type === "patient" && <input type="text" placeholder="Phone" value={phone||""} onChange={(e) => setPhone(e.target.value)} />}

          {type === "doctor" && (
            <input
              type="text"
              placeholder="Department"
              value={department||""}
              onChange={(e) => setDepartment(e.target.value)}
            />
          )}
<select value={gender||""} onChange={(e) => setGender( e.target.value)}>
            <option>Gender</option>
            <option>Male</option>
            <option>Female</option>
          </select>
          <input type="password" placeholder="New Password" />
          <input type="password" placeholder="Confirm Password" />
          {type === "doctor" && (
            <div className="upload-box">
              <input
                type="file"
                id="upload-cert"
                onChange={(e) => setCertificate(e.target.files[0])}
              />
              <label htmlFor="upload-cert">Upload graduation certificate</label>
            </div>
          )}
        </div>
      </section>

      {/* Clinic Details */}
      {type === "doctor" && (
        <section className="section-box">
          <h3 className="section-title">
            <FaClinicMedical className="icon" /> Clinic Details
          </h3>
          <div className="form-grid">
            <input
              type="text"
              placeholder="Change your clinic's address"
              value={clinic||""}
              onChange={(e) => setClinic(e.target.value)}
            />
            <input
              type="number"
              placeholder="Update appointment fee"
              value={fee||""}
              onChange={(e) => setFee(e.target.value)}
            />
            <input
              type="number"
              placeholder="Update consultation fee"
              value={Cfee||""}
              onChange={(e) => setCfee(e.target.value)}
            />
            <div className="profile-photo">
              <label>Change Clinic Address</label>
              <input
                type="url"
                placeholder="Enter your Clinic Location"
                value={clinicLink||""}
                onChange={(e) => setClinicLink(e.target.value)}
              />
            </div>
          </div>
        </section>
      )}

      {/* Availability Schedule */}
      {type === "doctor" && (
        <section className="section-box">
          <h3 className="section-title">
            <FaClock className="icon" /> Availability Schedule
          </h3>
          <div className="availability">
            {availability.map((dayItem, dayIndex) => (
              <div className="schedule-item" key={dayItem.day}>
                <div className="day-row">
                  <span>{dayItem.day}</span>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={dayItem.active}
                      onChange={() => toggleDay(dayIndex)}
                    />
                    <span className="slider"></span>
                  </label>
                </div>

                {dayItem.active && (
                  <div className="time-inputs">
                    {dayItem.times.map((time, timeIndex) => (
                      <div key={timeIndex} className="time-slot">
                        <input
                          type="time"
                          value={time.from}
                          onChange={(e) =>
                            handleTimeChange(
                              dayIndex,
                              timeIndex,
                              "from",
                              e.target.value
                            )
                          }
                        />
                        <span>to</span>
                        <input
                          type="time"
                          value={time.to}
                          onChange={(e) =>
                            handleTimeChange(
                              dayIndex,
                              timeIndex,
                              "to",
                              e.target.value
                            )
                          }
                        />
                        <button
                          type="button"
                          className="delete-time-btn"
                          onClick={() => {
                            const updated = [...availability];
                            updated[dayIndex].times.splice(timeIndex, 1);
                            setAvailability(updated);
                          }}
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      className="add-time-btn"
                      onClick={() => addTimeSlot(dayIndex)}
                    >
                      + Add another Time Slot
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="actions">
        <button className="cancel-btn"onClick={() => navigate(-1)}>Cancel</button>
        <button className="save-btn" onClick={handleUpdate}>
          Save Changes
        </button>
      </div>
    </div>
  );
}

export default ProfileForm;
