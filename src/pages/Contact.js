import React from 'react'
import Layout from '../components/Layout/Layout';
import {BiMailSend, BiPhoneCall,} from "react-icons/bi";
import { FaWhatsapp } from "react-icons/fa";
import { GrLocation } from "react-icons/gr";

const Contact = () => {
  return (
  <Layout title={"Contact Us | Paws To Whiskers"}>
  {/* ---------- Banner Section ---------- */}
      <div className="contact-banner">
        <div className="contact-banner-overlay">
          <h1>CONTACT US</h1>
        </div>
      </div>

      {/* ---------- Contact Info Section ---------- */}
      <div className="container contact-section py-5">
        <h2 className="text-center mb-3">Have Questions or Need Assistance?</h2>
        <p className="text-center text-muted mb-5">
         We’re always available for any queries and issues. However, if your query isn’t covered, here’s how you can get in touch with us.
        </p>

        <div className="row g-4">
          {/* WhatsApp */}
          <div className="col-md-6 col-lg-3">
            <div className="contact-card">
              <div className="icon-circle">
                <FaWhatsapp />
              </div>
              <h5>Whatsapp</h5>
              <p><a href="#" target="_blank" rel="noreferrer">+91 123456789</a></p>
            </div>
          </div>

          {/* Email */}
          <div className="col-md-6 col-lg-3">
            <div className="contact-card">
              <div className="icon-circle">
                <BiMailSend />
              </div>
              <h5>Email</h5>
              <p><a href="#">help@pawstowhiskers.com</a></p>
            </div>
          </div>

          {/* Call */}
          <div className="col-md-6 col-lg-3">
            <div className="contact-card">
              <div className="icon-circle">
                <BiPhoneCall />
              </div>
              <h5>Call</h5>
              <p>+91 123456789 <br></br>
              Available 24x7</p>
            </div>
          </div>

          {/* Address */}
          <div className="col-md-6 col-lg-3">
            <div className="contact-card">
              <div className="icon-circle">
                < GrLocation />
              </div>
              <h5>Our Address</h5>
              <p>
               12 Whisker Lane,Pawsville District,  Fluffington City, 110042, India
              </p>
            </div>
          </div>
        </div>
      </div>
  </Layout>
  );
};

export default Contact;