import React from 'react';
import './index.css';
import { GoLocation } from 'react-icons/go';
import { ImPhone } from 'react-icons/im';
import { MdEmail } from 'react-icons/md';
import { FaFacebookF } from 'react-icons/fa';
import { FiInstagram } from 'react-icons/fi';
import { AiFillLinkedin } from 'react-icons/ai';



function Footer() {
    const callDate = () => {
        var date = new Date().getFullYear();
        return date
    }
    return (
        <div className="footer">
            <div className="info-footer">
                <div className="details">
                    <div>About</div>
                    <ul>
                        <li>
                            <span><GoLocation /></span>
                            <span>Near KhatuShyam Mandir, C-21 Mall, MR-9, Indore(M.P)</span>
                        </li>
                        <li>
                            <span><ImPhone /></span>
                            <span>+91-7828072833, 9340874488</span>
                        </li>
                        <li>
                            <span><MdEmail /></span>
                            <span>shanki000gupta@gmail.com</span>
                        </li>
                    </ul>
                </div>
                <div className="social">
                    <ul>
                        <li>
                            <span><a href="https://www.facebook.com/public/shanki.gupta.585"><FaFacebookF /></a></span>
                        </li>
                        <li>
                            <span><a href="https://www.instagram.com/s_jai_s/"><FiInstagram /></a></span>
                        </li>
                        <li>
                            <span><a href="https://www.linkedin.com/in/shainki-gupta-b982a7a2"><AiFillLinkedin /></a></span>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="copyright">
                <p>Copyright &copy;{callDate()} All rights reserved </p>
            </div>
        </div>
    );
}

export default Footer;
