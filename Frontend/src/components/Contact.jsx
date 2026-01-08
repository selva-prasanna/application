import React from 'react';
import './Contact.css';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import AccessTimeFilledRoundedIcon from '@mui/icons-material/AccessTimeFilledRounded';

const Contact = () => {
  return (
    <>
      <section id="contact-header" className="blog-header">
        <h2>Let's Talk</h2>
        <p>LEAVE A MESSAGE. We love to hear from you!</p>
      </section>

      <section id="contact-details" className="section-p1">
        <div className="details">
          <span>GET IN TOUCH</span>
          <h2>Visit one of our agency locations or contact us today</h2>
          <h3>Head Office</h3>
          <div>
            <li>
              <i><LocationOnIcon/></i>
              <p>123 New Road, Erode, TamilNadu</p>
            </li>
            <li>
              <i><EmailIcon/></i>
              <p>dealdock@gmail.com</p>
            </li>
            <li>
              <i><AccessTimeFilledRoundedIcon/></i>
              <p>Monday to Saturday: 9.00am to 7pm</p>
            </li>
            <li>
              <i><PhoneIcon/></i>
              <p>+91 9791734770</p>
            </li>
          </div>
          {/* <div className="map">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15852.767127746527!2d3.3342050302487367!3d6.623083758589159!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b93da2d76f539%3A0x3b411fb0cffa28a0!2sOgba%20101233%2C%20Ojodu%2C%20Lagos!5e0!3m2!1sen!2sng!4v1684569657312!5m2!1sen!2sng"
        width="600"
        height="450"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Map"
      ></iframe>
    </div> */}
        </div>
      </section>

      <section id="form-details" className="section-p1">
        <form action="">
          <span>LEAVE A MESSAGE</span>
          <h2>We love to hear from you</h2>
          <input type="text" placeholder="First Name" />
          <input type="text" placeholder="Last Name" />
          <input type="email" placeholder="Email" />
          <input type="number" placeholder="Phone Number" />
          <textarea cols="30" rows="8" placeholder="Type your message here..."></textarea>
          <button className="btn normal">Submit</button>
        </form>
      </section>
      
    </>
  );
};

export default Contact;
