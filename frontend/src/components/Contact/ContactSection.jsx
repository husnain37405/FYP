import React from 'react';
import './Contact.css'; 

const ContactSection = () => {
  return (
    <section className="contact-section">
      <div className="contact-container">
        <h2 className="contact-title" style={{marginLeft:0}}>Empowering Communities, Changing Lives</h2>
        <div className="contact-info">
          <div className="contact-item">
            <a href="tel:+17739049008"><i className="fas fa-phone-alt"></i></a>
            <span>+1 (773) 904-9008</span>
          </div>
          <div className="contact-item">
            <a href="mailto:info@welfarefoundation.com"><i className="fas fa-envelope"></i></a>
            <span>info@welfarefoundation.com</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
