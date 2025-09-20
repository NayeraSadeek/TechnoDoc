import React, { useState,useEffect,useRef  } from "react";
import pic from "../../assets/img/profile.png";
import'../../styles/doctorcards.css';
import axios from "axios";


const DoctorCarousel = ({ setSelectedDoctor, bookingRef,searchQuery,selectedDepartment   }) => {
  const [doctors, setDoctors] = useState([]);
  const [index, setIndex] = useState(0);


  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/doctors") // API endpoint
      .then((res) => setDoctors(res.data))
      .catch((err) => console.error(err));
  }, []);
    const filteredDoctors = doctors.filter((doc) => {
    const matchesSearch = searchQuery
      ? doc.name.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    const matchesDepartment = selectedDepartment
      ? doc.department_id === selectedDepartment
      : true;
  //   const matchesDepartment = selectedDepartment
  // ? doc.department_id === Number(selectedDepartment)
  // : true;


    return matchesSearch && matchesDepartment;
  });

  const next = () => {
    if (index < doctors.length - 3) setIndex(index + 1);
  };

  const prev = () => {
    if (index > 0) setIndex(index - 1);
  };
const handleBookNow = (doctor) => {
    setSelectedDoctor(doctor);
    bookingRef.current.scrollIntoView({ behavior: "smooth" }); 
  };

  return (
    <div className="doctor-cards">
      <button
        aria-label="Scroll previous"
        id="btn-prev"
        className="btn-arrow"
        onClick={prev}
      >
        ❮
      </button>

      {/* Cards */}
      {filteredDoctors.slice(index, index + 4).map((doc) => (

        <div className="card" key={doc.id}>
          <div className="circle-image">
            <img src={pic} alt="Doctorname" />
          </div>
          <div className="doc-info">
            <h2>Dr. {doc.name}</h2>
<p>{doc.department?.name}</p>



            <p className="price">{doc.fee} EGP</p>
            <p>{doc.clinic}</p>
          {doc.appointments && doc.appointments.length > 0 ? (
    <div className="time-list">
      {doc.appointments.map((app) => (
        <div key={app.id} className="time-item">
          {app.day} 
          <br></br>
           {app.start_time} - {app.end_time}
        </div>
      ))}
    </div>
  ) : (
    <p>No Available Time yet</p>
  )}
      </div>
            <button className="book-btn" onClick={() => handleBookNow(doc)}>
          Book Now
          </button>
          </div>
))}

      <button
        aria-label="Scroll next"
        id="btn-next"
        className="btn-arrow"
        onClick={next}
      >
        ❯
      </button>
    </div>
  );
}

export default DoctorCarousel;
