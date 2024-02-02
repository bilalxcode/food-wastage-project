import React from 'react'

export default function PageHeader({headertitle}) {
  return (
<div style={{
  width: "1400px",
  height: "40vh",
  marginTop: "2em",
  color: "white",
  textAlign: "center",
  justifyContent: "center",
  fontFamily: "Monsterat, sans-serif",
  background: `url('pic.jpg')`,  
  backgroundSize: "cover",
  backgroundPosition: "center",
}}>
  <h1 style={{ paddingTop: "2.3em", color:"white" }}>{headertitle}</h1>
  <a style={{ color: "white", fontWeight:'bold' }} href='/'>Home</a>
</div>

  )
}
