import React from 'react'
import Layout from '../components/Layout/Layout';
import { FaUserShield, FaLock, FaCookieBite, FaEnvelopeOpenText, FaRegHandshake, FaPaw } from "react-icons/fa";


const Policy = () => {
  return (
    <Layout title={"Privacy Policy | Paws To Whiskers"}>
      {/* ---------- Banner Section ---------- */}
      <div className="policy-banner text-center ">
        <div className="policy-banner-overlay ">
          <h1>Privacy Policy</h1>
          <p>Your trust means the world to us</p>
        </div>
      </div>

          {/* ---------- Policy Content Section ---------- */}
      <div className="container policy-section py-5">
        <h2 className="text-center mb-4">How We Protect Your Data</h2>
        <p className="text-center text-muted mb-5">
          At <strong>Paws to Whiskers</strong>, your privacy is our priority.
          We handle your data responsibly to ensure a safe, secure, and
          delightful experience for every pet parent. 🐶🐱
        </p>

        <div className="row g-4">
          {/* Row 1 */}
          <div className="col-md-6 col-lg-4">
            <div className="policy-card">
              <div className="icon-circle">
                <FaUserShield />
              </div>
              <h5>Personal Information</h5>
              <p>
                We collect only the essential details — your name, address, and
                contact info — to personalize your pet shopping experience.
              </p>
            </div>
          </div>

          <div className="col-md-6 col-lg-4">
            <div className="policy-card">
              <div className="icon-circle">
                <FaLock />
              </div>
              <h5>Data Security</h5>
              <p>
                All sensitive data is encrypted using industry standards to keep
                your personal and payment details completely safe.
              </p>
            </div>
          </div>

          <div className="col-md-6 col-lg-4">
            <div className="policy-card">
              <div className="icon-circle">
                <FaCookieBite />
              </div>
              <h5>Cookies</h5>
              <p>
                We use cookies to remember your preferences and show you products
                your pets will adore — because treats aren’t just for them!
              </p>
            </div>
          </div>

          {/* Row 2 */}
          <div className="col-md-6 col-lg-4">
            <div className="policy-card">
              <div className="icon-circle">
                <FaEnvelopeOpenText />
              </div>
              <h5>Communication</h5>
              <p>
                We only send updates and offers if you’ve opted in. You can
                unsubscribe anytime — no hard feelings!
              </p>
            </div>
          </div>

          <div className="col-md-6 col-lg-4">
            <div className="policy-card">
              <div className="icon-circle">
                <FaRegHandshake />
              </div>
              <h5>Third-Party Access</h5>
              <p>
                We may share limited data with secure partners (like payment
                gateways and couriers) to complete your orders efficiently.
              </p>
            </div>
          </div>

          <div className="col-md-6 col-lg-4">
            <div className="policy-card">
              <div className="icon-circle">
                <FaPaw />
              </div>
              <h5>Pet Care Insights</h5>
              <p>
                We analyze data trends anonymously to improve our pet care
                suggestions and bring better products to your pets’ paws.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center mt-5">
          <p className="text-muted">
            Updated on: <strong>October, 2025</strong>
          </p>
          <p>
            For any privacy concerns, contact us at{" "}
            <a href="#">
              privacy@pawstowhiskers.com
            </a>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Policy;