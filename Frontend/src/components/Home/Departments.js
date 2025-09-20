import React from 'react';
import '../../styles/Departments.css';
import { motion } from 'framer-motion';
import eyeIcon from '../../assets/img/eye.png';
import dentistIcon from '../../assets/img/dentistt.png';
import dermIcon from '../../assets/img/dermatology.png';
import heartIcon from '../../assets/img/heart.png';
import humanIcon from '../../assets/img/human.png';
import pregnantIcon from '../../assets/img/pregnant.png';
import radiologyIcon from '../../assets/img/radiology.png';
import mentalHealthIcon from '../../assets/img/mental-health.png';

const departments = [
    { name: "Ophthalmology", icon: eyeIcon, alt: "Ophthalmology" },
    { name: "Dentistry", icon: dentistIcon, alt: "Dentistry" },
    { name: "Dermatology", icon: dermIcon, alt: "Dermatology" },
    { name: "Cardiology", icon: heartIcon, alt: "Cardiology" },
    { name: "Internal", icon: humanIcon, alt: "Internal" },
    { name: "Obstetrics and Gynecology", icon: pregnantIcon, alt: "Obstetrics and Gynecology" },
    { name: "Radiology", icon: radiologyIcon, alt: "Radiology" },
    { name: "Psychiatry", icon: mentalHealthIcon, alt: "Psychiatry" },
];



function Departments() {
    return (
        <section className="departments py-5 text-center" id="departments">
            <div className="container">
                <h2 className="department-title mb-5">Our Departments</h2>
                <div className="row g-4 justify-content-center">
                    {departments.map(({ name, icon, alt }, index) => (
                        <motion.div
                            key={index}
                            className="col-6 col-md-3"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <div className="department-box p-3 rounded h-100 d-flex flex-column justify-content-between align-items-center">
                                <div className="icon-circle mb-3 mx-auto d-flex align-items-center justify-content-center">
                                    <img src={icon} alt={alt} className="img-fluid" style={{ width: 60, height: 60 }} />
                                </div>
                                <p className="fw-bold" style={{ fontSize: '20px' }}>{name}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Departments;
