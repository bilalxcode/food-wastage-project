import React from 'react';
import { FaPizzaSlice, FaHamburger, FaIceCream } from 'react-icons/fa';

function ServicesBox() {
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '70vh', // Adjust the height as needed
  };

  const boxStyle = {
    width: '400px',
    padding: '20px',
    textAlign: 'center',
    margin: '20px',
    border: '1px solid #ccc',
    backgroundColor: '#fcf4f4',
    borderRadius: '15px',
    fontFamily: 'Roboto Slab',
  };

  const iconStyle = {
    fontSize: '36px',
    marginBottom: '10px',
  };

  return (
    <div style={containerStyle}>
      {/* Box 1 */}
      <div style={boxStyle}>
        <div style={iconStyle}>
          <FaPizzaSlice />
        </div>
        <h2>To add Near to Expire Products</h2>
        <p>Add products that are close to their expiration date to effectively manage inventory and reduce waste.</p>
      </div>

      {/* Box 2 */}
      <div style={boxStyle}>
        <div style={iconStyle}>
          <FaHamburger />
        </div>
        <h2>To add Composted Products</h2>
        <p>Add products that have already expired to keep track of inventory and ensure that will be helpful for farmers.</p>
      </div>

      {/* Box 3 */}
      <div style={boxStyle}>
        <div style={iconStyle}>
          <FaIceCream />
        </div>
        <h2>To take Education from us</h2>
        <p>Access educational resources to stay informed about the latest industry trends and best practices.</p>
      </div>
    </div>
  );
}

export default ServicesBox;
