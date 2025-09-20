import React,{useEffect,useState} from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';


import Nav from './components/Home/Nav';
import Hero from './components/Home/Hero';
import About from './components/Home/About';
import Services from './components/Home/Services';
import Departments from './components/Home/Departments';
import Footer from './components/Home/Footer';
import Login from './components/Form/Login';
import Register from './components/Form/Register';
import Forgetpass from './components/Form/Forgetpass';
import Changepass from './components/Form/Changepass';
import EditDoctorProfile from './components/ProfileEdit/EditDoctorProfile';
import EditPatientProfile from './components/ProfileEdit/EditPatientProfile';
import BookAppointment from "./components/Home/bookappointment";
import DoctorDashboard from './components/Home/DoctorDashboard';
import DoctorprofileRequest from './components/Home/DoctorProfileRequest';
import PatientProfile from './components/Home/PatientProfile';
import Upcoming from './components/Home/Upcoming';
import Pending from './components/Home/Pending';
import SuccessModal from './components/Home/done';
function HomePage() {
  return (
    <>
      <Nav />
      <Hero />
      <About />
      <Services />
      <Departments />
      <Footer />
    </>
  );
}

function App() {
    const [data, setData] = useState(null);

  //   useEffect(() => {
  //   fetch("http://127.0.0.1:8000/api/test")
  //     .then((res) => res.json())
  //     .then((result) => setData(result))
  //     .catch((err) => console.error("Error:", err));
  // }, []);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forget-password" element={<Forgetpass />} />
      <Route path="/change-password" element={<Changepass />} />
      <Route path="/doctor-profile" element={<EditDoctorProfile />} />
      <Route path="/patient-profile" element={<EditPatientProfile />} />
      <Route path="/book-appointment" element={<BookAppointment />} />  
      {/* <Route path="/DocProfile" element={<DoctorDashboard />} />   */}
      <Route path="/DoctorProfileRequest" element={<DoctorprofileRequest />} />  
      <Route path="/PatientProfile" element={<PatientProfile />} />  
      <Route path="/Upcoming" element={<Upcoming />} />  
      <Route path="/Pending" element={<Pending />} />  
      <Route path="/About" element={<About />} />  
      <Route path="/Services" element={<Services />} />  
      <Route path="/Departments" element={<Departments />} />  
      <Route path="/EditDoctorProfile" element={<EditDoctorProfile />} />  
      <Route path="/done" element={<SuccessModal/>} ></Route>
      <Route path="/DocProfile/:id" element={<DoctorDashboard />} />  
      <Route path="/PatientProfile/:id" element={<PatientProfile />} />  
      <Route path="/DoctorProfileRequest/:id" element={<DoctorprofileRequest />} />  
      <Route path="/Pending/:id"element={<Pending/>} />
      <Route path="/Upcoming/:id"element={<Upcoming/>} />
      <Route path="/EditDoctorProfile/:id" element={<EditDoctorProfile />} />
<Route path="/EditPatientProfile/:id" element={<EditPatientProfile type="patient" />} />




    </Routes>
//  <div className="App">
//       <h1>React ↔ Laravel Test</h1>
//       {data ? <p>{data.message}</p> : <p>Backend is working 🎉
// ...</p>}
//     </div>
  );
}

export default App;
