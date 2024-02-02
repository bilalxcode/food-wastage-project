import React from 'react';

function TeamMembers() {
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '70vh', // Adjust the height as needed
  };

  const boxStyle = {
    width: '200px',
    textAlign: 'center',
    margin: '50px',
    fontFamily: 'Roboto Slab',
  };

  const imageStyle = {
    width: '250px',
    height: '250px',
    borderRadius: '10%',
    marginBottom: '10px',
  };

  return (
    <div style={containerStyle}>
      {/* Member 1 */}
      <div style={boxStyle}>
        <img style={imageStyle} src='teammember1.jpg' alt="Team Member 1" />
        <h6 style={{ fontWeight: 'bold', textAlign: 'center' }}>John Doe</h6>
      </div>

      {/* Member 2 */}
      <div style={boxStyle}>
        <img style={imageStyle} src='teammember2.jpeg' alt="Team Member 2" />
        <h6 style={{ textAlign: 'center' }}>Jane Smith</h6>
      </div>

      {/* Member 3 */}
      <div style={boxStyle}>
        <img style={imageStyle} src='teammember3.jpg' alt="Team Member 3" />
        <h6 style={{ textAlign: 'center' }}>Bob Johnson</h6>
      </div>
    </div>
  );
}

export default TeamMembers;
