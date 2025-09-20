import React from 'react';
import '../../styles/Services.css';
import { motion } from 'framer-motion';
function Services() {
    const services = [
        {
            id: 1,
            title: "Easy Booking",
            desc: "Find doctors, choose a time, and book instantly.",
            align: "left",
            hasConnector: true,
        },
        {
            id: 2,
            title: "Flexible Scheduling",
            desc: "Doctors can confirm or suggest another time.",
            align: "right",
            hasConnector: true,
        },
        {
            id: 3,
            title: "Manage Appointment",
            desc: "View and reschedule your bookings anytime.",
            align: "left",
            hasConnector: true,
        },
        {
            id: 4,
            title: "Variety of Doctors",
            desc: "Select from different specialties and expertise.",
            align: "right",
            hasConnector: false,
        }
    ];

    return (
        <section className="services-section" id="services">
            <div className="container">
                <h2 className="services-title">Our Services</h2>

                {services.map((service, index) => (
                    <div className={`service-row ${service.align}`} key={index}>
                        <motion.div
                            className="service-box"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.2 }}
                            viewport={{ once: true, amount: 0.3 }}
                        >
                            <span className="service-number">
                                {String(service.id).padStart(2, '0')}
                            </span>
                            <h5>{service.title}</h5>
                            <p>{service.desc}</p>

                            {service.hasConnector && (
                                <div className={`connector-box ${service.align === 'left' ? 'right' : 'left'}`}></div>
                            )}
                        </motion.div>
                    </div>

                ))}
            </div>
        </section >
    );
}

export default Services;
