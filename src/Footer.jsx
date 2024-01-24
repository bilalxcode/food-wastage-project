import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <>
         <div className='container6'>
        <footer className='footer1'>
            <br></br>
            <h3 className='fh'>Foodocity</h3>
            <h3 className='fh2'>Queries
            <h4 className='gm1'>Foodocity1@gmail.com</h4>
            <a href='' target='_blank'>
                <img src='instagram.png'alt='instapic' className='ins'></img>
            </a>
            <a href='' target='_blank'>
                <img src='facebook.png'alt='facebookpic' className='fac'></img>
            </a>
            <a href='' target='_blank'>
                <img src='whatsapp.png'alt='whatsapppic' className='what'></img>
            </a>
            </h3>
            <h3 className='terms1'>Terms and Conditions
            <div class="myDIV">Cashbacks.</div>
            <div class="hide1">Your Cashback is non-refundable and non-exchangeable, not a liability by Foodocity or any Vendor. If deemed ineligible or awarded in error, Foodocity can claw back Cashback without notice. In fraud or illegal activity suspicion, Foodocity can deduct Cashback at its discretion. Foodocity's decisions are final.</div>
            <div class="myDIV">Data Privacy.</div>
            <div class="hide2"> Users' information related to food waste reporting should be handled in accordance with the platform's privacy policy.</div>
            </h3>
            <img src='FoodocityLogo.jpg' alt='foodocitylogo' className='fologo'/>
        </footer>
        </div>
    </>
  );
};

export default Footer;
