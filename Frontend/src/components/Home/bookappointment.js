 import React, { useState,useRef,useEffect   } from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import '../../styles/bookappointment.css';
import Calendar from "./calender";
import pic from "../../assets/img/profile.png";
import done from '../../assets/img/done.png';
import SearchBar from "./searchbar";
import DoctorCarousel from "./doctorcards";
import TimesSlots from "./TimesSlots";
import axios from "axios";

const AppointmentBooking = () => {
  const today = new Date();
  const [month, setMonth] = useState(today.toLocaleString("default", { month: "long" }));
  const [year, setYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    issue: "",
    payment: "",
    phone:"",
  });
  const [showModal, setShowModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
const [selectedDoctor, setSelectedDoctor] = useState(null);
  const bookingRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");
const [selectedDepartment, setSelectedDepartment] = useState(null);

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];




  // Calendar setup
  const firstDayOfMonth = new Date(`${month} 1, ${year}`).getDay();
  const totalDays = new Date(year, new Date(`${month} 1, ${year}`).getMonth() + 1, 0).getDate();

  const dates = [];
  for (let i = 0; i < firstDayOfMonth; i++) dates.push(null);
  for (let d = 1; d <= totalDays; d++) dates.push(d);

  // Handle booking
  const handleBookAppointment = (e) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime) {
      alert("Please select a date and time before booking.");
      return;
    }
    setShowModal(true);
  };
  // Change month navigation
  const handlePrevMonth = () => {
    const current = new Date(`${month} 1, ${year}`);
    current.setMonth(current.getMonth() - 1);
    setMonth(current.toLocaleString("default", { month: "long" }));
    setYear(current.getFullYear());
  };

  const handleNextMonth = () => {
    const current = new Date(`${month} 1, ${year}`);
    current.setMonth(current.getMonth() + 1);
    setMonth(current.toLocaleString("default", { month: "long" }));
    setYear(current.getFullYear());
  };

function toMysqlDatetime(isoDate) {
  if (!isoDate) return null; 
  const date = new Date(isoDate);
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0'); 
  const dd = String(date.getDate()).padStart(2, '0');
  const hh = String(date.getHours()).padStart(2, '0');
  const mi = String(date.getMinutes()).padStart(2, '0');
  const ss = String(date.getSeconds()).padStart(2, '0');

  return `${yyyy}-${mm}-${dd} ${hh}:${mi}:${ss}`;
}

const appointmentDateTime = new Date(selectedDate);
if (selectedTime) {
  const [hours, minutes] = selectedTime.split(":");
  appointmentDateTime.setHours(hours, minutes);
}
const mysqlDate = toMysqlDatetime(appointmentDateTime);

const handleConfirm = async () => {
  try {
    await axios.post("http://localhost:8000/api/appointments", {
      doctor_id: selectedDoctor.id,
   email: formData.email, 
     name: formData.name,
         appointment_date: mysqlDate,
        slot: selectedTime, 
         issue: formData.issue,  
  paymentmethod: formData.payment,
     status: "pending", 

    });

  setShowModal(false);    
    setShowSuccessModal(true);   
  } catch (error) {
    console.error("Error booking appointment", error);
    if (error.response) {
    console.log("Response data:", error.response.data);
    console.log("Status code:", error.response.status);
    console.log("Headers:", error.response.headers);
    alert(error.response.data.message || "Server error occurred");
  } else if (error.request) {
    console.log("No response received:", error.request);
    alert("No response from server");
  } else {
    console.log("Error setting up request:", error.message);
    alert(error.message);
  }

  }
};
  const [availableSlots, setAvailableSlots] = useState([]);

  useEffect(() => {
  if (selectedDoctor) {
    axios.get(`http://localhost:8000/api/doctors/${selectedDoctor.id}/available-times`)
      .then(res => {
        console.log("Doctor times:", res.data);  
        setAvailableSlots(res.data);
      })
      .catch(err => {
        console.error("Error fetching times", err);
      });
  }
}, [selectedDoctor]);

 
  return (
    <>
    <Nav />

           <section className="Text">
        <div className="Text-text">
          <h2>
            Book your <strong>appointment</strong>
            <br />
            quickly and at your
            <br />
            <strong>chosen time.</strong>
          </h2>
        </div>
      </section>
        <SearchBar
      onSearch={({ query, department }) => {
        setSearchQuery(query);
        setSelectedDepartment(department);
      }}
    />

    <hr class="divider" aria-hidden="true" />

{/* Dooctor Cards */}
<DoctorCarousel 
setSelectedDoctor={setSelectedDoctor} 
bookingRef={bookingRef}  
 searchQuery={searchQuery}
       selectedDepartment={selectedDepartment}

 />
    <hr className="divider" aria-hidden="true" />

      {/* Calendar & Times */}
      <div className="calendar-times-container">
{/* <Calendar/> */}
<Calendar onDateSelect={(date) => setSelectedDate(date)} />

        <section className="times">
          <h3>Available Times</h3>
          <div className="time-options">
<TimesSlots slots={availableSlots} doctor={selectedDoctor} selectedSlot={selectedTime} 
  onSelectSlot={setSelectedTime} />
          </div>
        </section>
      </div>
    <hr className="divider" aria-hidden="true" />

      {/* Booking Form */}
      <main className="booking-form"id="booking-form"  ref={bookingRef}>
        <h2>Book your Appointment</h2>
        <p>Select a date and time slot to proceed.</p>
        <form onSubmit={handleBookAppointment}>
          <input
            type="text"
            placeholder="Patient Name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <input
            type="text"
            placeholder="Issue"
            required
            value={formData.issue}
            onChange={(e) => setFormData({ ...formData, issue: e.target.value })}
          />
           <input
            type="text"
            placeholder="phone"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
          <select
            required
            value={formData.payment}
            onChange={(e) => setFormData({ ...formData, payment: e.target.value })}
          >
            <option value="" disabled>
              Payment method
            </option>
            <option>Credit Card</option>
            <option>Paypal</option>
            <option>Pay on clinic</option>
            <option>Cash</option>
          </select>
          <button type="submit" className="btn-primary">
            Book Appointment
          </button>
        </form>
      </main>

{showModal &&selectedDoctor&& (
  <div className="modal">
    <div className="modal-content">
      <button
        className="close-btn"
        onClick={() => setShowModal(false)}
      >
        ×
      </button>
      <h3 className="text-center text-xl font-semibold mb-4" style={{ color: "#147C87" }}>
        Appointment Details
      </h3>
      <div className="text-center my-4">
        <img
         src={pic}
          alt="Doctor"
          className="circle-image mx-auto"
        />
        <h4 className="mt-2 font-semibold text-lg"style={{ color: "#147C87" }}>
          Dr .{selectedDoctor.name}
        </h4>
        <p className="text-gray-600" style={{ color: "#727777ff" }} >
  <strong>{selectedDoctor.department?.name}</strong>
          </p>
      </div>
      <div className="grid grid-cols-2 gap-4 text-[#147C87] text-sm md:grid-cols-2">
         <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2">
          <i className="fas fa-calendar-alt"style={{ color: "#147C87" }}></i>
          <span>
            {selectedDate
              ? selectedDate.toLocaleDateString("en-GB", {
                  weekday: "long",
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })
              : "Not selected"}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <i className="fas fa-clock"style={{ color: "#147C87" }}></i>
          <span>{selectedTime || "Not selected"}</span>
        </div>
        </div>

          <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2">
          <i className="fas fa-map-marker-alt"style={{ color: "#147C87" }}></i>
          <span>{selectedDoctor.clinic}</span>
        </div>

        <div className="flex items-center space-x-2">
          <i className="fas fa-credit-card"style={{ color: "#147C87" }}></i>
          <span>{formData.payment || "Payment in the clinic"}</span>
        </div>
      </div>
</div>
          <hr className="divider" aria-hidden="true" />

      <div className="text-[#147C87] text-sm space-y-2">
        <p>
          <strong style={{ color: "#147C87" }}>Patient Name:</strong> {formData.name || "Not provided"}
        </p>
        <p>
          <strong style={{ color: "#147C87" }}>Phone:</strong> {formData.phone || ""}
        </p>
        <p>
          <strong style={{ color: "#147C87" }}>Email:</strong> {formData.email || "patient@gmail.com"}
        </p>
      </div>
<br></br>
      <div className="flex justify-center gap-4 mt-6">
      <div className="modal-buttons">
              <button
              style={{ margin: "20px" ,padding:"10px"}}
                className="btn-primary"
                onClick={handleConfirm}
              >
                Confirm Appointment
              </button>
              <button className="btn-secondary" onClick={() => setShowModal(false)} style={{ margin: "20px" ,padding:"10px"}}>
                 Edit Information
              </button>
            </div>
      </div>
      
    </div>
  </div>
)}

{showSuccessModal && (
  <div className="modal">
    <div className="modal-content">
      <button
        className="close-btn"
        onClick={() => setShowSuccessModal(false)}
      >
        ×
      </button>
      <div className="text-center p-6">
        <h3 className="text-center text-xl font-semibold mb-4" style={{ color: "#147C87" }}>
        Your appointment has been successfully booked!
      </h3>
       <img
          src={done}
          alt="Success"
          className="circle-image mx-auto"
        />
         <h4 className="text-center text-xl font-semibold mb-4" style={{ color: "#147C87" }}>
Thank you for choosing TechnoDoc!      </h4>
        <p className="text-gray-600" style={{ color: "#147C87" }}>
Hope you feel better soon-we’re here for you   </p>
      </div>
    </div>
  </div>
)}

    <Footer />
    </>
  );
};


export default AppointmentBooking;
