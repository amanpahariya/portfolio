import React, { useState } from 'react';
import './index.scss';
import { FaBars } from 'react-icons/fa';
import { RiCloseFill } from 'react-icons/ri';

function Navbar() {

    const [toggle, setToggle] = useState(false);

    const [scroll, setScroll] = useState(null);

    const onclick = () => {
        setToggle(!toggle);
    }

    const onScroll = () => {
        const scrollPosition = window.scrollY
        setScroll(scrollPosition);
    }

    window.addEventListener('scroll', onScroll);

    return (
        <nav className={scroll < 100 ? "nav" : "nav nav-scroll"}>
            <div className="navbar-brand">
                <h1>Shainki Gupta</h1>
            </div>
            <div className="bars">
                {toggle ? <RiCloseFill size={35} onClick={onclick} />
                    : <FaBars size={30} onClick={onclick} />}
            </div>
            <div className={toggle ? "none nav-menu-1" : "none"}>
                <ul className="nav-menu">
                    <li className="nav-link">
                        <a href="#home" style={{ color: ' #fff', textDecoration: "none" }} onClick={onclick}>Home</a>
                    </li>
                    <li className="nav-link" >
                        <a href="#about-section" style={{ color: ' #fff', textDecoration: "none" }} onClick={onclick}>About</a>
                    </li>
                    <li className="nav-link">
                        <a href="#resume-section" style={{ color: ' #fff', textDecoration: "none" }} onClick={onclick}>Resume</a>
                    </li>
                    <li className="nav-link" >
                        <a href="#contact-us-section" style={{ color: ' #fff', textDecoration: "none" }} onClick={onclick}>Contact Us</a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
