import React from 'react'
import './city.css';



const Cities = (props) => {
  return (
    <>
      <div className='card'>
      <img src={props.imgsrc} alt={props.alt} title={props.lahore} className='lahore'></img>
      <h2 className='n2'>Lahore</h2>
      </div>
    </>
    
  );
};

export default Cities;