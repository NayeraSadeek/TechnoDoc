import React from 'react';
import '../../styles/Hero.css';
import doctorsImage from '../../assets/img/hero.png';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';   

const typingVariant = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05,
        },
    },
};

const letterVariant = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
};

const Hero = () => {
    const heading = "Find the right doctor, book with ease, and stay healthy.";
    const navigate = useNavigate(); 

    return (
        <div className="hero-section d-flex align-items-center">
            <div className="container">
                <div className="row align-items-center">

                    <div className="col-md-6 order-2 order-md-1 text-white hero-text">


                        <motion.h2
                            variants={typingVariant}
                            initial="hidden"
                            animate="visible"
                            className="mb-3"
                        >
                            {heading.split("").map((char, index) => (
                                <motion.span key={index} variants={letterVariant}>
                                    {char}
                                </motion.span>
                            ))}
                        </motion.h2>


                        <motion.ul
                            className="hero-list"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1, duration: 0.6 }}
                        >
                            <li>Your health is our priority – Book your appointment easily and quickly.</li>
                            <li>Your medical appointment in one click!</li>
                            <li>Peace of mind starts with easy booking.</li>
                            <li>Hassle-free medical bookings.</li>
                        </motion.ul>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.5, duration: 0.6 }}
                        >
                            “Your care starts here!”
                        </motion.p>

                        <motion.button
                            className="btn rounded-pill mt-3 white-btn"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 2, duration: 0.5 }}
                            onClick={() => navigate("/book-appointment")} 
                        >
                            Make Appointment
                        </motion.button>
                    </div>


                    <div className="col-md-6 order-1 order-md-2">
                        <motion.img
                            src={doctorsImage}
                            alt="Doctors Team"
                            className="img-fluid"
                            initial={{ scale: 0.9, rotate: -2 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            whileHover={{ scale: 1.05 }}
                        />
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Hero;
