import React, { useState } from 'react';
import 'animate.css';
import './Signupform.css';
import axios from 'axios';

const SignupForm = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5555/users/register', {
        email,
        username,
        password,
        phoneno: phoneNumber,
      });

      setSuccessMessage('User registered successfully!');
      console.log('User created:', response.data);
    } catch (error) {
      console.error('Error registering user:', error);
      setErrorMessage('Registration Failed!. Please fill info correctly.');
    }
  };

  return (
    <div className="signup-form">
      <div className="animate__animated animate__fadeInLeft animate__slow">
        <h1 className='foodocityanimation'>Foodocity</h1>
      </div>
      <h1>Sign Up</h1>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="tel"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
     {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
  );
};

export default SignupForm;
