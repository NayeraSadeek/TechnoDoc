import React, { useState } from 'react';
import '../../styles/About.css';
import { motion } from 'framer-motion';
import aboutImg from '../../assets/img/about.png';

const About = () => {
    const [showMore, setShowMore] = useState(false);

    const toggleReadMore = () => {
        setShowMore(!showMore);
    };

    return (
        <section className="about-section" id="about">
            <div className="about-wrapper container d-flex flex-column flex-md-row align-items-center gap-5">

                {/* Image Animation */}
                <motion.div
                    className="about-image"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <img src={aboutImg} alt="Doctor" className="img-fluid" />
                </motion.div>

                {/* Text Animation */}
                <motion.div
                    className="about-text"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <h3 className="about-title">About Us</h3>

                    <p>
                        In a world full of challenges, we understand the importance of
                        <span className="highlight"> quick and easy access to healthcare</span>.
                        That’s why we created our platform to
                        <span className="highlight"> simplify medical appointment booking and health record management, saving you time and effort</span>.
                    </p>

                    <p>
                        Our goal is to
                        <span className="highlight"> use technology to improve healthcare, making it easier and more efficient for everyone</span>.
                    </p>

                    {showMore && (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.4 }}
                        >
                            We believe health comes first, and we’re here to make your medical journey smoother and more organized. Join us!
                        </motion.p>
                    )}

                    <button
                        className="btn btn-link p-0 text-decoration-underline primary-text"
                        onClick={toggleReadMore}
                    >
                        {showMore ? 'Read less' : 'Read more'}
                    </button>
                </motion.div>
            </div>
        </section>
    );
};

export default About;
