import React from 'react';
import { AiFillHome } from 'react-icons/ai';
import { MdCall } from 'react-icons/md';
import { GrSkype } from 'react-icons/gr';
import { RiSendPlaneFill } from 'react-icons/ri'
import './index.css'
function ContactUs() {
    return (
        <div className="contactContainer">
            <div className="contact-title">
                <h1>Contact Me</h1>
            </div>
            <div className="cards-container">
                <div className="contact-cards">
                    <div className="inner-card">
                        <div>
                            <div className="contact-icons">
                                <AiFillHome size={25} />
                            </div>
                            <h3>Address</h3>
                            <p>Near KhatuShyam Mandir, C-21 Mall, MR-9, Indore(M.P).</p>
                        </div>
                    </div>
                </div>
                <div className="contact-cards">
                    <div className="inner-card">
                        <div>
                            <div className="contact-icons">
                                <MdCall size={25} />
                            </div>
                            <h3>Address</h3>
                            <p>Near KhatuShyam Mandir, C-21 Mall, MR-9, Indore(M.P).</p>
                        </div>
                    </div>
                </div>
                <div className="contact-cards">
                    <div className="inner-card">
                        <div>
                            <div className="contact-icons">
                                <RiSendPlaneFill size={25} />
                            </div>
                            <h3>Address</h3>
                            <p>Near KhatuShyam Mandir, C-21 Mall, MR-9, Indore(M.P).</p>

                        </div>
                    </div>
                </div>
                <div className="contact-cards">
                    <div className="inner-card">
                        <div>
                            <div className="contact-icons">
                                <GrSkype size={25} />
                            </div>
                            <h3>Address</h3>
                            <p>Near KhatuShyam Mandir, C-21 Mall, MR-9, Indore(M.P).</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContactUs;
