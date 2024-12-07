import React from 'react';
import { Link} from 'react-router-dom'; 
import { useSelector } from 'react-redux';
import './CallToAction.css'
function CallToAction() {
  const token = useSelector((state)=>state.auth.token)
  const role = useSelector((state)=>state.auth.currentRole)
  return (
    <div className="cta-container-wrapper">
      <div className="cta-container">
        <img src="src/assets/images/support.jpg" alt="Support" className="cta-image" />
        <div className="cta-overlay"></div>
        <div className="cta-content">
          <div className="cta-circle">
            <i className="fa-solid fa-hand-holding-heart"></i>
          </div>
          <div className="cta-text-container">
            {/* <h2>Unlock your potential with our dedicated support.</h2>
            <h4>Don't hesitate to contact us</h4> */}
            <h2>We’re here to support you</h2>
            <h4>We’re here to help</h4>
          </div>
          <button  className="cta-button">
          {token && role === 'Requester' ? (
          <Link to="/requester-dashboard"  state={{role: 'Requester'}} >
         Requester Dashboard
        </Link>
      ) : (
          <Link to="/requester-login">
         Request Assistance
        </Link>
      )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CallToAction;
