import React from 'react';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import YouTubeIcon from '@mui/icons-material/YouTube';

const Footer = () => {
  return (
    <footer>
    <div className="col">
      <a href="#"><img className="logo" src="./images/logo.png" alt="Logo" width={'180px'} /></a>
      <h4>Contact</h4>
      <p><strong>Address:</strong> 123, New Street, Coimbatore, TamilNadu</p>
      <p><strong>Phone:</strong> +91 7388002856, +91 9912450945</p>
      <p><strong>Hours:</strong> 9.00 - 7.00, Mon - Sat</p>

        <div className="follow">
          <h4>Follow Us</h4>
          <div className="icon">
            <a href="https://www.facebook.com/" className='facebook'><FacebookOutlinedIcon/></a>
            <a href="https://www.instagram.com/" className='instagram'><InstagramIcon/></a>
            <a href="https://x.com/" className='twitter'><XIcon/></a>
            <a href="https://www.youtube.com/" className='youtube'><YouTubeIcon/></a>
          </div>
        </div>

      </div>

      <div className="sec">
        <div className="col">
          <h4>About</h4>
          <a href="#">About Us</a>
          <a href="#">Delivery Information</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms and Condition</a>
          <a href="/Contact">Contact Us</a>
        </div>
        <div className="col">
          <h4>My Account</h4>
          <a href="#">Sign In</a>
          <a href="#">View Cart</a>
          <a href="#">My Wishlist</a>
          <a href="#">Track My Order</a>
          <a href="#">Help</a>
        </div>
        <div className="col install">
          <h4>Install App</h4>
          <p>From App Store or Google Play</p>
          <div className="row">
            <img src="https://i.postimg.cc/Y2s5mLdR/app.jpg" alt="App Store" />
            <img src="https://i.postimg.cc/7YvyWTS6/play.jpg" alt="Google Play" />
          </div>
          <p>Secured Payment Gateways</p>
          <img src="https://i.postimg.cc/kgfzqVRW/pay.png" alt="Payment Gateways" />
        </div>
      </div>

      <div className="copyright">
        <p> Made with <span>❤</span> <span className='deal'>Deal</span> <span>Dock</span>  | <span>©</span> All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
