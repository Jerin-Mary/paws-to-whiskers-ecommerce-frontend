import React from 'react'
import Layout from '../components/Layout/Layout';
import { BsCheckCircleFill } from 'react-icons/bs';

const About = () => {
  return (
    <Layout title={"About Us | Paws To Whiskers"}>
         {/* ---------- Banner Section ---------- */}
      <div className="about-banner">
        <div className="about-banner-overlay">
          <h1>ABOUT US</h1>
        </div>
      </div>

       {/* ---------- Stats Section ---------- */}
      <div className="container about-stats py-5">
        <h2 className="text-center mb-4">Paws to Whiskers at a Glance</h2>
        <div className="row g-4 text-center">
          <div className="col-md-3 about-no">
            <div className="stat-card" style={{ backgroundColor: '#DEE1FF' }}>
              <h3>2000+</h3>
              <p>Happy Customers</p>
            </div>
          </div>
          <div className="col-md-3 about-noo">
            <div className="stat-card" style={{ backgroundColor: '#FFE2DB' }}>
              <h3>500+</h3>
              <p>Premium Pet Products</p>
            </div>
          </div>
          <div className="col-md-3 about-no">
            <div className="stat-card" style={{ backgroundColor: '#DEE1FF' }}>
              <h3>50+</h3>
              <p>Trusted Pet Brands</p>
            </div>
          </div>
          <div className="col-md-3 about-noo">
            <div className="stat-card" style={{ backgroundColor: '#FFE2DB' }}>
              <h3>10+</h3>
              <p>Cities Served</p>
            </div>
          </div>
        </div>
      </div>

      {/* ---------- Journey Section ---------- */}
      <div className="container about-journey py-5">
        <h1 className="mb-4 text-center">Our Journey: From Passion to Purpose</h1>
        <div className="row align-items-center">
          <div className="col-md-7 about-para">
            <p>
              Founded with a deep love for animals, <strong>Paws to Whiskers</strong> began as an online destination designed to make pet parenting simpler, smarter, and happier. 
              What started as a small idea to bridge the gap between quality pet products and accessibility has now grown into a trusted pet care platform loved by thousands.
            </p>
            <p>
              Our store offers a wide range of premium pet products — from food and toys to grooming essentials and health accessories — all handpicked to ensure safety, comfort, and joy for your furry friends. Whether you’re a dog lover, a cat parent, or care for smaller companions, we’re here to support every paw, tail, and whisker.
            </p>

            <ul className="about-list mt-3">
              <li><BsCheckCircleFill /> Wide range of pet food, toys, and grooming supplies</li>
              <li><BsCheckCircleFill /> Collaboration with 50+ trusted national and international brands</li>
              <li><BsCheckCircleFill /> Fast and reliable delivery across multiple cities</li>
              <li><BsCheckCircleFill /> Committed to promoting responsible and joyful pet care</li>
            </ul>
          </div>
          <div className="col-md-5 text-center">
            <img
              src="../images/about-pet.jpg"
              alt="about us"
              className="img-fluid"
            />
          </div>
        </div>
      </div>
    </Layout>
    
  );
};

export default About;