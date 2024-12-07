
import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Contact() {
  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      'service_r3pz3rs',
      'template_k1sxlym',
      form.current,
      'ta7r9NAkKQrbv17Ql',
    )
      .then(
        (result) => {
          console.log(result);
          console.log('SUCCESS!');
          toast.success("Message sent successfully!", {
            progressStyle: { backgroundColor: '#3368c6' }
          });
          form.current.reset();
        },
        (error) => {
          console.log(error)
          toast.error("Failed to send message. Please try again.");
        },
      );
  };
  return (
    <>
      <div className="contact-page" style={{
        position: 'relative',
        width: '100%',
        height: '400px',
      }}>
        <img src="src/assets/images/hero-bg.jpg" alt="Hero Image" style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }} />

        <div className="contact-pg-content" style={{
          position: 'absolute',
          top: 0,

          left: '13.5%',
          width: '73%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          fontSize: '45px',
          //   color: '#031b4e', 
          fontFamily: 'Sora, sans-serif',
          fontWeight: 'normal',
          lineHeight: '60px',
          letterSpacing: '0px',
          // color: 'rgb(3, 27, 78)',
          color: '#fff',
          textTransform: 'none',
          fontStyle: 'normal',
        }}>
          Contact Us
        </div>

      </div>

      <div style={styles.container}>
        <form style={styles.form} ref={form} onSubmit={sendEmail}>
          <h2 style={styles.heading}>Feel free to send us a Message</h2>
          <div style={styles.row}>
            <input type="text" name="user_name" placeholder="Name" style={styles.input} />
            <input type="email" name="user_email" placeholder="Enter Email" style={styles.input} />
          </div>
          <div style={styles.row}>
            <input type="text" name="phone_number" placeholder="Phone Number" style={styles.input} />
            <input type="text" name="subject" placeholder="Subject" style={styles.input} />
          </div>
          <div style={styles.row}>
            <textarea name="message" placeholder="Message" style={styles.textarea}></textarea>
          </div>
          <div style={styles.buttonContainer}>
            <button type="submit" style={styles.button}>SUBMIT NOW</button>
          </div>
        </form>
        <ToastContainer />
      </div>
    </>
  );
}

const styles = {
  container: {
    marginTop: '70px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f0f7fd',
  },
  form: {
    width: '90%',
    maxWidth: '820px',
    backgroundColor: '#ffffff',
    padding: '40px',
    borderRadius: '10px',
    boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)',
    border: '1px solid #031b4e',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '25px',
    color: '#031b4e',
    fontSize: '28px',
    fontWeight: 'bold',
  },
  row: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    marginBottom: '20px',
  },
  input: {
    width: '100%',
    padding: '15px',
    border: '1px solid #031b4e',
    borderRadius: '5px',
    fontSize: '16px',
    color: '#6e778c',
    backgroundColor: '#f8fafc',
  },
  textarea: {
    width: '100%',
    padding: '15px',
    border: '1px solid #031b4e',
    borderRadius: '5px',
    fontSize: '16px',
    color: '#6e778c',
    backgroundColor: '#f8fafc',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
  },
  button: {
    padding: '15px 20px',
    backgroundColor: '#031b4e',
    boxShadow: '0 5px 5px 0 rgba(66, 133, 244, .3)',
    color: '#ffffff',
    border: 'none',
    borderRadius: '25px',
    fontSize: '15px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
};
export default Contact;



