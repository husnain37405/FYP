// import React from 'react';
// import './Footer.css';  
// const Footer = () => {
//   return (
//     <footer className="footer">
//       <div className="footer-container">
//         <div className="main-columns">
//           <div className="intro">
//             <img src="src/assets/images/logo.png" alt="Welfare Foundation Logo" className="footer-logo" />
//             <p className="intro-text">
//               Nowshera Foundation Welfare: Committed to fostering a more equitable and just society, we tirelessly work towards improving the quality of life for underprivileged communities by providing essential support services, educational programs, healthcare initiatives, and sustainable development projects, all while advocating for social justice and community empowerment through grassroots efforts, ensuring that no one is left behind and everyone has the opportunity to thrive and achieve their full potential in a nurturing and supportive environment.
//             </p>
//           </div>
//           <div className="info-section">
//             <h3>Ensuring Access to Essential Services and Support for all Community.</h3>
//             <div className="info-columns">
//               <div className="info">
//                 <h2>Contact Info</h2>
//                 <p><i className="fas fa-phone-alt"></i> +1 (773) 904-9008</p>
//                 <p><i className="fas fa-envelope"></i> info@welfarefoundation.com</p>
//                 <p><i className="fas fa-clock"></i> Office Hours: 9AM - 5PM (GMT-6, CST)<br />Monday - Friday</p>
//                 <div className="social-media">
//                   <a href="#"><i className="fab fa-facebook-f"></i></a>
//                   <a href="#"><i className="fab fa-linkedin-in"></i></a>
//                   <a href="#"><i className="fab fa-instagram"></i></a>
//                 </div>
//               </div>
//               <div className="address">
//                 <h2>Our Address</h2>
//                 <p><i className="fas fa-map-marker-alt"></i> 4401 N Keeler Ave<br />Chicago, IL 60630</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="footer-copyright">
//         <p><a href="#">Terms and conditions</a> | <a href="#">Privacy policy</a></p>
       
//         <p>Copyright &copy; 2024 <a href="#" style={{ textDecoration: 'underline' }}>Nowshera Foundation</a></p>
//       </div>
//     </footer>
//   );
// };

// export default Footer;


import React, { useState } from 'react';
import './Footer.css';
import TermsAndConditionsModal from '../../pages/TermsAndConditionsModal';
import PrivacyPolicyModal from '../../pages/PrivacyPolicyModal';
import { Link, useNavigate } from 'react-router-dom';
const Footer = () => {
  const [modalContent, setModalContent] = useState(null);
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
    window.scrollTo(0, 0);
  };
  const handleOpenModal = (content) => {
    setModalContent(content);
  };

  const handleCloseModal = () => {
    setModalContent(null);
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="main-columns">
          <div className="intro">
            <img onClick={handleClick} src="src/assets/images/logo.png" alt="Welfare Foundation Logo" className="logo" />
            <p className="intro-text">
              Nowshera Foundation Welfare: Committed to fostering a more equitable and just society,
              we tirelessly work towards improving the quality of life for underprivileged
              communities by providing essential support services, educational programs, healthcare
              initiatives, and sustainable development projects, all while advocating for social justice
              and community empowerment through grassroots efforts, ensuring that no one is left behind
              and everyone has the opportunity to thrive and achieve their full potential in a nurturing
              and supportive environment.
            </p>
          </div>
          <div className="info-section">
            <h3>Ensuring Access to Essential Services and Support for all Community.</h3>
            <div className="info-columns">
              <div className="info">
                <h2>Contact Info</h2>
                <p><i className="fas fa-phone-alt"></i> +92 346 0547007</p>
                <p><i className="fas fa-envelope"></i> info@welfarefoundation.com</p>
                <p><i className="fas fa-clock"></i> Office Hours: 9AM - 5PM (GMT-6, CST)<br />Monday - Friday</p>
                <div className="social-media">
                  <a href="#"><i className="fab fa-facebook-f"></i></a>
                  <a href="#"><i className="fab fa-linkedin-in"></i></a>
                  <a href="#"><i className="fab fa-instagram"></i></a>
                </div>
              </div>
              <div className="address">
                <h2>Our Address</h2>
                {/* <p><i className="fas fa-map-marker-alt"></i> 4401 N Keeler Ave<br />Chicago, IL 60630</p> */}
                <p><i className="fas fa-map-marker-alt"></i> Post Office Ziarat Masoom, Village Nowshera, Tehsil <br />Havelian, Abbottabad, Pakistan</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-copyright">
        <p>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleOpenModal('terms');
            }}
          >
            Terms and Conditions
          </a>
          {' | '}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleOpenModal('privacy');
            }}
          >
            Privacy Policy
          </a>
        </p>
        <p>
          Copyright &copy; 2024
          {/* <a href="#" style={{ textDecoration: 'underline' }}>Nowshera Foundation</a> */}
          <Link onClick={handleClick} to={"/"} style={{ textDecoration: 'underline' }}>Nowshera Foundation</Link>
        </p>
      </div>

      {modalContent === 'terms' && (
        <TermsAndConditionsModal isOpen={true} onClose={handleCloseModal} />
      )}
      {modalContent === 'privacy' && (
        <PrivacyPolicyModal isOpen={true} onClose={handleCloseModal} />
      )}
    </footer>
  );
};

export default Footer;
