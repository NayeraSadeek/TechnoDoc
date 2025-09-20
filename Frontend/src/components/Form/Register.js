import React, { useState, useEffect } from "react";
import loginImage from "../../assets/img/loginImg.png";
import Nav from "../Home/Nav";
import { FaUser, FaClinicMedical, FaClock } from "react-icons/fa";
import axios from "axios";

function Registration() {
  const [activeTab, setActiveTab] = useState("Doctor");
  const [errors, setErrors] = useState({});
  const [departments, setDepartments] = useState([]);

  const [personalInfo, setPersonalInfo] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    department_id: "",
    gender: "",
    certificate: null,
    age: "",
    phone: "",
    // role:"patient"
  });
  const [clinicDetails, setClinicDetails] = useState({
    address: "",
    appointmentFee: "",
    consultationFee: "",
    profilePhoto: null,
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
  const handleChange = (e) => {
    setPersonalInfo({ ...personalInfo, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/departments")
      .then((res) => {
        setDepartments(res.data);
      })
      .catch((err) => {
        console.error("Error fetching departments:", err);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for Password

    if (personalInfo.password !== personalInfo.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    const url =
      activeTab === "Doctor"
        ? "http://127.0.0.1:8000/api/register/doctor"
        : "http://127.0.0.1:8000/api/register/patient";
    let payload = {
      name: personalInfo.fullName || "",
      email: personalInfo.email || "",
      password: personalInfo.password || "",
      gender: personalInfo.gender || "",
      department_id: personalInfo.department_id ? Number(personalInfo.department_id) : null, // 👈
      clinic: clinicDetails.address || "",
      fee: clinicDetails.appointmentFee || 0,
      Cfee: clinicDetails.consultationFee || 0,
      phone: personalInfo.phone || "",
    };

    //

    if (activeTab === "Doctor") {
      payload = {
        ...payload,
        doctorappointment: availability
          .filter((day) => day.active) // خد الأيام المفعلة بس
          .map((day) =>
            day.times.map((time) => ({
              day: day.day,
              start_time: time.from,
              end_time: time.to,
            }))
          )
          .flat(),
      };
    } else {
      payload = {
        ...payload,
        age: personalInfo.age,
        phone: personalInfo.phone, // <-- هنا رقم الموبايل
      };
    }

    try {
      console.log("Final Payload Sent:", payload);

      const res = await axios.post(url, payload);
      console.log("Backend response:", res.data);
      alert(res.data.message || "No message returned");
      setErrors({});
    } catch (err) {
      console.error("Error response:", err.response?.data || err);
      if (err.response && err.response.status === 422) {
        setErrors(err.response.data.errors);
        alert(Object.values(err.response.data.errors).flat().join("\n"));
      } else {
        alert(err.response?.data?.message || "Registration failed!");
      }
    }
  };

  return (
    <>
      <Nav />
      <section className="login d-flex align-items-center">
        <div className="container">
          <div className="login-co row w-100 overflow-hidden align-items-center">
            <div className="col-lg-6 d-none d-lg-block position-relative  p-0 overflow-hidden">
              <img src={loginImage} className="login-img" alt="Register" />
              <div className="position-absolute top-50 start-50 translate-middle text-white text-center">
                <h2 className="fw-bold mb-3">JOIN US!</h2>
                <p>
                  "Create your account and take care of your health or your
                  patients with ease"
                </p>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="bg-white p-5 form-text">
                <div className="d-flex mb-3">
                  <button
                    type="button"
                    className={`btn me-2 ${
                      activeTab === "Doctor" ? "btn-teal" : "btn-outline-teal"
                    }`}
                    onClick={() => setActiveTab("Doctor")}
                  >
                    Doctor
                  </button>
                  <button
                    type="button"
                    className={`btn ${
                      activeTab === "Patient" ? "btn-teal" : "btn-outline-teal"
                    }`}
                    onClick={() => setActiveTab("Patient")}
                  >
                    Patient
                  </button>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="accordion" id="registerAccordion">
                    <div className="accordion-item">
                      <h2 className="accordion-header">
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#personal"
                        >
                          <FaUser className="icon" /> Personal Information
                        </button>
                      </h2>
                      <div
                        id="personal"
                        className="accordion-collapse collapse "
                        data-bs-parent="#registerAccordion"
                      >
                        <div className="accordion-body row g-2">
                          <div className="col-md-6">
                            <input
                              type="text"
                              name="fullName"
                              className="form-control"
                              placeholder="Full Name"
                              value={personalInfo.fullName}
                              onChange={handleChange}
                            />
                            {/* checker */}
                            {errors.name && (
                              <small className="text-danger">
                                {errors.name[0]}
                              </small>
                            )}
                          </div>

                          <div className="col-md-6">
                            <input
                              type="email"
                              name="email"
                              className="form-control"
                              placeholder="Email"
                              value={personalInfo.email}
                              onChange={handleChange}
                            />
                            {errors.email && (
                              <small className="text-danger">
                                {errors.email[0]}
                              </small>
                            )}
                          </div>

                          <div className="col-md-6">
                            <input
                              type="password"
                              className="form-control"
                              placeholder="Password"
                              name="password"
                              value={personalInfo.password}
                              onChange={handleChange}
                            />
                            {errors.password && (
                              <small className="text-danger">
                                {errors.password[0]}
                              </small>
                            )}
                          </div>
                          <div className="col-md-6">
                            <input
                              type="password"
                              className="form-control"
                              placeholder="Confirm Password"
                              name="confirmPassword"
                              value={personalInfo.confirmPassword}
                              onChange={handleChange}
                            />
                          </div>

                          {activeTab === "Doctor" ? (
                            <div className="col-md-6">
                              <select
                                className="form-control"
                                value={personalInfo.department_id}
                                onChange={(e) =>
                                  setPersonalInfo({
                                    ...personalInfo,
                                    department_id:  Number(e.target.value),
                                  })
                                }
                              >
                                <option value="">Department</option>
                                {departments.map((dept) => (
                                  <option key={dept.id} value={dept.id}>
                                    {dept.name}
                                  </option>
                                ))}
                              </select>
                            </div>
                          ) : (
                            <div className="col-md-6">
                              <input
                                type="number"
                                className="form-control"
                                placeholder="Age"
                                value={personalInfo.age}
                                onChange={(e) =>
                                  setPersonalInfo({
                                    ...personalInfo,
                                    age: e.target.value,
                                  })
                                }
                              />
                            </div>
                          )}

                          <div className="col-md-6">
                            <select
                              className="form-control"
                              value={personalInfo.gender}
                              onChange={(e) =>
                                setPersonalInfo({
                                  ...personalInfo,
                                  gender: e.target.value,
                                })
                              }
                            >
                              <option value="">Gender</option>
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                            </select>
                          </div>
                          {activeTab === "Patient" && (
                            <div className="col-md-6">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Phone Number"
                                value={personalInfo.phone}
                                onChange={(e) =>
                                  setPersonalInfo({
                                    ...personalInfo,
                                    phone: e.target.value,
                                  })
                                }
                              />
                            </div>
                          )}
                          {activeTab === "Doctor" && (
                            <div className="col-12">
                              <input
                                type="file"
                                className="form-control"
                                onChange={(e) =>
                                  setPersonalInfo({
                                    ...personalInfo,
                                    certificate: e.target.files[0],
                                  })
                                }
                              />
                              <label
                                htmlFor="certificate"
                                className="placeholder-text"
                              >
                                Upload graduation certificate
                              </label>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {activeTab === "Doctor" && (
                      <div className="accordion-item">
                        <h2 className="accordion-header">
                          <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#clinic"
                          >
                            <FaClinicMedical className="icon" /> Clinic Details
                          </button>
                        </h2>
                        <div
                          id="clinic"
                          className="accordion-collapse collapse"
                          data-bs-parent="#registerAccordion"
                        >
                          <div className="accordion-body row g-2">
                            <div className="col-12">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Clinic Address"
                                value={clinicDetails.address}
                                onChange={(e) =>
                                  setClinicDetails({
                                    ...clinicDetails,
                                    address: e.target.value,
                                  })
                                }
                              />
                            </div>
                            <div className="col-md-6">
                              <input
                                type="number"
                                className="form-control"
                                placeholder="Appointment Fee"
                                value={clinicDetails.appointmentFee}
                                onChange={(e) =>
                                  setClinicDetails({
                                    ...clinicDetails,
                                    appointmentFee: e.target.value,
                                  })
                                }
                              />
                            </div>
                            <div className="col-md-6">
                              <input
                                type="number"
                                className="form-control"
                                placeholder="Consultation Fee"
                                value={clinicDetails.consultationFee}
                                onChange={(e) =>
                                  setClinicDetails({
                                    ...clinicDetails,
                                    consultationFee: e.target.value,
                                  })
                                }
                              />
                            </div>
                            <div className="col-12">
                              <input
                                type="url"
                                className="form-control"
                                id="clinicLink"
                                name="clinic_location_link"
                                placeholder="Enter Google Maps link"
                                onChange={(e) =>
                                  setClinicDetails({
                                    ...clinicDetails,
                                    clinicLink: e.target.value,
                                  })
                                }
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeTab === "Doctor" && (
                      <div className="accordion-item">
                        <h2 className="accordion-header">
                          <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#availability"
                          >
                            <FaClock className="icon" /> Availability Schedule
                          </button>
                        </h2>
                        <div
                          id="availability"
                          className="accordion-collapse collapse"
                          data-bs-parent="#registerAccordion"
                        >
                          <div className="accordion-body">
                            {availability.map((dayItem, dayIndex) => (
                              <div
                                key={dayItem.day}
                                className="mb-3 border p-2 rounded"
                              >
                                <div className="d-flex justify-content-between align-items-center">
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
                                  <div className="mt-2">
                                    {dayItem.times.map((time, timeIndex) => (
                                      <div
                                        key={timeIndex}
                                        className="d-flex align-items-center gap-2 mb-2"
                                      >
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
                                          className="btn btn-sm btn-danger"
                                          onClick={() => {
                                            const updated = [...availability];
                                            updated[dayIndex].times.splice(
                                              timeIndex,
                                              1
                                            );
                                            setAvailability(updated);
                                          }}
                                        >
                                          ✕
                                        </button>
                                      </div>
                                    ))}
                                    <button
                                      type="button"
                                      className="btn btn-sm btn-outline-primary"
                                      onClick={() => addTimeSlot(dayIndex)}
                                    >
                                      + Add another Time Slot
                                    </button>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="d-flex justify-content-center mt-3">
                    <button type="submit" className="btn btn-teal">
                      Register
                    </button>
                  </div>
                </form>

                <div className="mt-3 text-center">
                  Already have an account?{" "}
                  <a href="/login" className="text-primary">
                    Login
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Registration;
