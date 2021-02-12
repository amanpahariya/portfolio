import React from 'react';
import { IoMdSchool } from 'react-icons/io';
import { CgOrganisation } from 'react-icons/cg';
import { FaAward } from 'react-icons/fa'
import './index.css'
function Resume() {
    return (
        <div id="resume-section">
            <div className="resumeContainer">
                <div className="resume-title">
                    <h1>Education</h1>
                </div>
                <div className="resume-info">
                    <div>
                        <div className="resume-icon">
                            <IoMdSchool size={30} />
                        </div>
                        <div>
                            <span>2014-2017</span>
                            <h2>Bachelor of Computer Applications (BCA)</h2>
                            <p>
                                Makhanlal Chaturvedi National
                                University of Journalism and Communication,
                                Bhopal (M.P)
                        </p>
                        </div>
                        <div>
                            <div className="resume-icon">
                                <IoMdSchool size={30} />
                            </div>
                            <div>
                                <span>2013-2014</span>
                                <h2>
                                    Senior Secondary Examination (class XII)
                        </h2>
                                <p>Government Higher Secondary School pichhore, Shivpuri</p>
                            </div>
                        </div>
                        <div>
                            <div className="resume-icon">
                                <IoMdSchool size={30} />
                            </div>
                            <div>
                                <span>2011-2012</span>
                                <h2>Higher Secondary Examination (class X)</h2>
                                <p>Thakur D.Singh Higher Secondary School Pichhore, Shivpuri.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="resumeContainer">
                <div className="resume-title">
                    <h1>Experience</h1>
                </div>
                <div className="resume-info">
                    <div>
                        <div className="resume-icon">
                            <CgOrganisation size={30} />
                        </div>
                        <div>
                            <span>2017-Present</span>
                            <h2>Business Devlopment Executive</h2>
                            <h4>BestPeers InfoSystem Pvt.Ltd</h4>
                            <p className="description">
                                I am a Business Development Excutive at BestPeers
                                InfoSystem Pvt.Ltd having 2.5 year of experience
                                     in generating new business through email marketing</p>
                        </div>

                    </div>
                </div>
            </div>
            <div className="resumeContainer">
                <div className="resume-title">
                    <h1>Skills</h1>
                    <div className="skills">
                        <ul>
                            <li><p>Expert strategist who uses research of competitors, market conditions, customer needs, and organizational core competencies to claim company success.</p></li>
                            <li><p>Skilled communicator and negotiator who understands persuasive delivery and can confidently present sales pitches to potential partners and reports to board members.</p></li>
                            <li><p>Researching the needs of other companies and the new trends prevailing the market.</p></li>
                            <li><p>The ability to handle quality leadership to large team of sales people.</p></li>
                            <li><p>Maintains relationships with clients by providing support, information, and guidance, researching and recommending new opportunities, recommending profit and service improvements. </p></li>
                            <li><p>Complete knowledge of all aspects of the sales cycle. </p></li>
                            <li><p>I Used Technologies For Bidding: Ruby on Rails, Django/Python, React/Redux, Angular.JS, Node.JS, Javascript/jQuery, Javascript, UI-UX, e-commerce, Fullstack, MEAN Stack, Frontend, Backend etc.. </p></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="resumeContainer">
                <div className="resume-title">
                    <h1>Awards</h1>
                </div>
                <div className="resume-info">
                    <div>
                        <div className="resume-icon">
                            <FaAward size={30} />
                        </div>
                        <div>
                            <span>2018</span>
                            <h2>Exellence Performance</h2>
                            <h4>BestPeers InfoSystem Pvt.Ltd</h4>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Resume;
