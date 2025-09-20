import React, { useState, useEffect } from "react";
import Nav from "./Nav";
import Footer from "./Footer"; 
import '../../styles/bookappointment.css';
import '../../styles/popup.css';
import {
  FaCalendar,
  FaClock,
  FaLocationDot,
  FaMoneyBill,
  FaUser,
  FaEnvelope,
} from "react-icons/fa6";


const App = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [appointmentDetails, setAppointmentDetails] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('10:00am - 10:30am');

  const month = new Date().toLocaleString('default', { month: 'long' });
  const year = new Date().getFullYear();
  const firstDayOfMonth = new Date(year, new Date().getMonth(), 1).getDay();
  const totalDays = new Date(year, new Date().getMonth() + 1, 0).getDate();
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const doctors = [
    { name: 'Dr Seif Elhawary', specialty: 'Dentistry', price: '150 EGP', image: 'Images/Doc.jpeg' },
    // Add more doctors here
  ];

  const handleBookAppointment = () => {
    setAppointmentDetails({ date: selectedDate, time: selectedTime, doctor: doctors[0] });
    setModalOpen(true);
  };

  return (
    <>
    <Nav />
    <div className="max-w-6xl mx-auto p-4 sm:p-6 bg-gray-50 text-slate-700 font-sans">
      {/* Hero Section */}
      <section className="relative bg-[url('https://images.unsplash.com/photo-1588776814546-1e1b7b1c962b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80')] bg-cover bg-center rounded-xl mb-6 min-h-[12rem] flex items-center px-4 sm:px-8 text-white shadow-lg">
        <div className="max-w-lg bg-gradient-to-r from-teal-900/70 to-transparent p-4 sm:p-6 rounded-xl">
          <h2 className="text-xl sm:text-2xl font-semibold">
            Book your <span className="font-bold">appointment</span><br />
            quickly and at your<br />
            <span className="font-bold">chosen time.</span>
          </h2>
        </div>
      </section>

      {/* Search Bar */}
      <section className="mb-8 flex justify-center">
        <form className="flex w-full max-w-4xl gap-2 bg-white rounded-lg shadow-md p-2 border border-teal-700">
          <input
            id="search"
            type="text"
            placeholder="Search for a doctor"
            autoComplete="off"
            className="input-custom flex-grow"
          />
          <select aria-label="Select doctor specialty" className="input-custom">
            <option selected>All doctors</option>
            <option>Family Medicine</option>
            <option>Dentistry</option>
            <option>Cardiology</option>
            <option>Neurology</option>
          </select>
          <button aria-label="Search doctors" type="submit" className="bg-teal-700 hover:bg-teal-800 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-shadow">
            Search
          </button>
        </form>
      </section>

      {/* Doctors Carousel */}
      <section className="relative mb-10 flex items-center gap-3">
        <div className="carousel">
          {doctors.map((doctor, index) => (
            <div key={index} className="bg-teal-600/90 rounded-xl p-4 shadow-lg min-w-[260px] text-white">
              <div className="flex flex-col items-center gap-2">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-20 h-20 rounded-full border-4 border-teal-100 object-cover"
                  draggable="false"
                />
                <h3 className="font-semibold truncate text-center">{doctor.name}</h3>
                <p className="text-sm opacity-90 text-center">{doctor.specialty}</p>
                <p className="text-xs opacity-80 text-center">{doctor.price}</p>
                <button onClick={handleBookAppointment} className="bg-white text-teal-700 rounded-lg px-4 py-1 font-semibold hover:bg-teal-100 transition">
                  Book
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Calendar & Time */}
      <div className="container flex flex-col sm:flex-row gap-6 sm:gap-12 border-t border-b border-teal-200 py-6">
        <section className="dates-section" aria-label="Available Dates">
          <h3>Available Dates</h3>
          <nav className="month-year" aria-label="Month navigation">
            <button aria-label="Previous month" type="button">‹</button>
            <div aria-live="polite">{`${month} ${year}`}</div>
            <button aria-label="Next month" type="button">›</button>
          </nav>
          <div className="weekdays" aria-hidden="true">
            {dayNames.map((day) => (
              <div key={day}>{day}</div>
            ))}
          </div>
          <div className="dates-grid" role="list" aria-label={`Dates for ${month} ${year}`}>
            {/* Add empty slots for days before the first day of the month */}
            {[...Array(firstDayOfMonth)].map((_, i) => (
              <div key={i} className="date disabled" aria-hidden="true"></div>
            ))}
            {/* Generate dates */}
            {[...Array(totalDays)].map((_, day) => {
              const dayNumber = day + 1;
              const isSelected = selectedDate === dayNumber ? 'selected' : '';
              return (
                <div
                  key={dayNumber}
                  className={`date ${isSelected}`}
                  role="listitem"
                  tabIndex="0"
                  aria-label={`${dayNames[(firstDayOfMonth + day) % 7]}, ${month} ${dayNumber}, ${year}`}
                  onClick={() => setSelectedDate(dayNumber)}
                >
                  {dayNumber}
                </div>
              );
            })}
          </div>
        </section>

        <section className="times-section" aria-label="Available Times">
          <h3>Available Times</h3>
          <div className="time-options">
            {['10:00am - 10:30am', '11:00am - 11:30am', '12:00pm - 12:30pm', '01:00pm - 01:30pm', '02:00pm - 02:30pm', '03:00pm - 03:30pm', '04:00pm - 04:30pm', '05:00pm - 05:30pm'].map((time, index) => (
              <div className="time-option" key={index}>
                <input
                  type="radio"
                  id={`time${index + 1}`}
                  name="timeslot"
                  checked={selectedTime === time}
                  onChange={() => setSelectedTime(time)}
                />
                <label htmlFor={`time${index + 1}`} className="time-label">{time}</label>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Booking Form */}
      <main className="bg-white p-6 rounded-lg shadow-md mt-6">
        <h2 className="text-lg font-semibold text-teal-700 mb-4">Book your Appointment</h2>
        <p className="text-sm text-gray-600 mb-4">Select a date and time slot to proceed.</p>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" placeholder="Patient Name" className="input-custom" required />
          <input type="email" placeholder="Email" className="input-custom" required />
          <input type="text" placeholder="Issue" className="input-custom md:col-span-2" required />
          <select className="input-custom md:col-span-2" required>
            <option selected disabled>Payment method</option>
            <option>Credit Card</option>
            <option>Paypal</option>
            <option>Pay on clinic</option>
            <option>Cash</option>
          </select>
          <button type="button" onClick={handleBookAppointment} className="bg-teal-700 hover:bg-teal-800 text-white font-semibold py-2 rounded md:col-span-2 transition">
            Book Appointment
          </button>
        </form>
      </main>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative">
            <button onClick={() => setModalOpen(false)} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl">&times;</button>
            <h2 className="text-lg font-semibold text-teal-700 mb-4 text-center">Appointment Details</h2>
            <img src={appointmentDetails.doctor?.image} alt="Doctor" className="w-24 h-24 rounded-full mx-auto mb-4 border-2 border-teal-600 object-cover" />
            <div className="text-center mb-4">
              <p className="text-teal-700 font-semibold">{appointmentDetails.doctor?.name}</p>
              <p className="text-gray-500 text-sm mb-4">{appointmentDetails.doctor?.specialty}</p>
              <p className="text-teal-700">Date: {appointmentDetails.date || 'Not selected'}</p>
              <p className="text-teal-700">Time: {appointmentDetails.time || 'Not selected'}</p>
            </div>
            <button onClick={() => alert('Appointment confirmed!')} className="bg-teal-700 hover:bg-teal-800 text-white font-semibold py-2 rounded">Confirm Appointment</button>
          </div>
        </div>
      )}
    </div>
     <Footer />
     </>
  );
};

export default App;
