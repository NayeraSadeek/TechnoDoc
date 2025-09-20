import React from 'react';
import '../../styles/Footer.css';
import { motion } from 'framer-motion';
import logo from '../../assets/img/TechnoDoc.png';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">

                {/* Brand Section */}
                <motion.div
                    className="brand-section"
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <a className="navbar-brand" href="#home">
                        <img src={logo} alt="TechnoDoc Logo" className='logo-img' />
                    </a>
                    <p className="description">
                        Easily book medical appointments and find doctors across various specialties through our simple and convenient platform.
                    </p>
                </motion.div>

                {/*Quick Links Section */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <h3 className="section-title">Quick Links</h3>
                    <ul className="link-list">
                        <li><a href="#home" className="link">Home</a></li>
                        <li><a href="#about" className="link">About</a></li>
                        <li><a href="#services" className="link">Services</a></li>
                        <li><a href="#departments" className="link">Departments</a></li>
                        <li><a href="#appointment" className="link">Make Appointment</a></li>
                    </ul>
                </motion.div>

                {/*Contact Section */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 }}
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <h3 className="section-title">Contact Us</h3>
                    <div className="contact-info">
                        <div className="contact-item">TechnoDoc@gmail.com</div>
                        <div className="contact-item">‪+201234567891‬</div>

                        <div className="social-icons">
                            <a href="#" className="social-icon" aria-label="Twitter">
                                <i className="fab fa-twitter"></i>
                            </a>
                            <a href="#" className="social-icon" aria-label="Facebook">
                                <i className="fab fa-facebook-f"></i>
                            </a>
                            <a href="#" className="social-icon" aria-label="WhatsApp">
                                <i className="fab fa-whatsapp"></i>
                            </a>
                        </div>
                    </div>
                </motion.div>

            </div>

            {/* Copyright */}
            <motion.div
                className="copyright"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                viewport={{ once: true, amount: 0.2 }}
            >
                © TechnoDoc 2025. All right reserved
            </motion.div>
        </footer>
    );
};

export default Footer;
