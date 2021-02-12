import React from 'react';

import image from '../../about.jpg';
import './index.css'

function About() {
    return (
        <>
            <div id="about-section" className="topContainer">
                <div className="about">
                    <img src={image} />
                </div>
                <div className="about-box">
                    <h1 className="about-tittle">About Me</h1>
                    <ul className="about-info">
                        <li><span>Name:</span> <span>Shainki Gupta</span></li>
                        <li><span>Date of birth:</span> <span>August 15, 1997</span></li>
                        <li><span>Address:</span> <span>Near KhatuShyam Mandir,&nbsp; C-21 Mall, MR-9, Indore(M.P).</span></li>
                        <li><span>Email:</span> <span>shanki000gupta@gmail.com</span></li>
                        <li><span>Phone: </span> <span>+91-7828072833, 9340874488 </span></li>
                    </ul>
                </div>
            </div>
            <div className="bottomContainer">
                <h1>More About Me</h1>
                <p>
                    Seeking position as Senior Business
                    Development Executive at BestPeers
                    Infosystem Pvt. Ltd to utilize 3.5 years of
                    experience, focused attention to detail, and
                    demonstrated ability to maximizecompany
                    profits through trategic
                    marketing.
                </p>
            </div>
        </>
    );
}

export default About;
