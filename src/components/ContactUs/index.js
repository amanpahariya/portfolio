import React from 'react';
import { AiFillHome } from 'react-icons/ai';
import { MdCall } from 'react-icons/md';
import { GrSkype } from 'react-icons/gr';
import { RiSendPlaneFill } from 'react-icons/ri'
import './index.css'
function ContactUs() {
    return (
        <div id="contact-us-section" className="contactContainer">
            <div className="contact-title">
                <h1>Contact Me</h1>
            </div>
            <div className="cards-container">
                <div className="contact-cards">
                    <div className="inner-card">
                        <div style={{height:'100%'}}>
                            <div className="contact-icons">
                                <AiFillHome size={25} />
                            </div>
                            <h3>Address</h3>
                            <p>Near KhatuShyam Mandir,&nbsp; C-21 Mall, MR-9, Indore(M.P).</p>
                        </div>
                    </div>
                </div>
                <div className="contact-cards">
                    <div className="inner-card">
                        <div style={{height:'100%'}}>
                            <div className="contact-icons">
                                <MdCall size={25} />
                            </div>
                            <h3>Contact Number</h3>
                            <p>+91-7828072833, 9340874488</p>
                        </div>
                    </div>
                </div>
                <div className="contact-cards">
                    <div className="inner-card">
                        <div style={{height:'100%'}}>
                            <div className="contact-icons">
                                <RiSendPlaneFill size={25} />
                            </div>
                            <h3>Email Address</h3>
                            <p>shanki000gupta@gmail.com</p>
                        </div>
                    </div>
                </div>
                <div className="contact-cards">
                    <div className="inner-card">
                        <div style={{height:'100%'}}>
                            <div className="contact-icons">
                                <GrSkype size={25} />
                            </div>
                            <h3>Skype</h3>
                            <p>live:f4bbefbe15240c7</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContactUs;
