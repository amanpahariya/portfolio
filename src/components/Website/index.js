import React from 'react';
import { Router } from 'react-router-dom';
import Navbar from '../Navbar';
import Home from '../Home';
import About from '../About';
import Resume from '../Resume';
import ContactUs from '../ContactUs';
import Footer from '../Footer';

function Website() {
    return (
        <>
            <Navbar />
            <Home />
            <About />
            <Resume />
            <ContactUs />
            <Footer />
        </>
    );
}

export default Website;
