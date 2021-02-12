import React, { useState } from 'react';
import './index.css';
import { Link } from 'react-router-dom';

import { FaBars } from 'react-icons/fa';
import { RiCloseFill } from 'react-icons/ri';

function Navbar() {

    const [toggle, setToggle] = useState(false);

    const onclick = () => {
        setToggle(!toggle);
    }


    return (
        <nav className="nav">
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
                        <Link to="/" style={{ color: ' #fff', textDecoration: "none" }} onClick={onclick}>Home</Link>
                    </li>
                    <li className="nav-link" >
                        <Link to="/about" style={{ color: ' #fff', textDecoration: "none" }} onClick={onclick}>About</Link>
                    </li>
                    <li className="nav-link">
                        <Link to="/resume" style={{ color: ' #fff', textDecoration: "none" }} onClick={onclick}>Resume</Link>
                    </li>
                    <li className="nav-link" >
                        <Link to="/contact-us" style={{ color: ' #fff', textDecoration: "none" }} onClick={onclick}>Contact Us</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
