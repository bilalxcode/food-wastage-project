import React from 'react'
import './index.css';
import { Link } from 'react-router-dom';



const src1 = "/FoodocityLogo.jpg";
const Header = () => {
  return (
    <>
        <Link to='/'><img src= {src1} className="logo"></img></Link>
        <header>
        <ul type="none">
    <li><Link to='/'><span className='liitem'>Home</span></Link></li>
    <li><Link to='/story'>Our Story</Link></li> 
    <li><Link to='/services'>Our Services</Link></li>
    <li><Link to='/team'>Our Team</Link></li>
    <li><Link to='/signup'>Signup</Link></li>
    <li><a href='/login'>Login</a></li>
</ul>
        </header>
    </>
  );
};

export default Header;
