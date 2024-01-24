import React from "react";
import "./index.css";
import Cities from "./Cities";
import Footer from "./Footer";
import Header from "./Header";
import "animate.css";
import { Link } from "react-router-dom";

// images paths
const src2 = "/homepageimage1.png";
const src3 = "/Mission.jpg";
const src4 = "/Vision.jpg";
const src5 = "/123.png";

// paragraphs
const missionparagraph =
  "We will reduce food wastage and its effects on environment. We want to reduce deaths by hunger, Moreover, we will reduce loss of food chains through this platform. our mission is to revolutionize the way we approach food consumption and wastage. We are committed to creating a sustainable future by harnessing the power of technology to reduce food waste and its far-reaching impact on our environment and society. Through our innovative web-based application, we connect individuals, businesses, and organizations to collaboratively tackle the global challenge of food wastage. ";
const visionparagraph =
  "We envision a future where food waste is transformed into valuable resources, through selling extra food and composting technologies. This circular approach will minimize environmental impact and will lessen loss of food chains due to wastage of extra food.By fostering a culture of responsible consumption, efficient distribution, and compassionate sharing, we aim to inspire a paradigm shift in how society views and manages its food resources. Through technology-driven solutions, impactful partnerships, and a shared commitment to sustainability, Foodocity strives to lead the way towards a more sustainable, nourished, and harmonious world for all.";

function Homepage() {
  return (
    <>
      <Header></Header>
      <div class="container1">
        <section className="s1">
          <img src={src2} className="homeimage"></img>
          <div class="animate__animated animate__fadeInLeft animate__slow">
            <h1 className="mainheading">Welcome to Foodocity</h1>
            <h5 className="mainheading2"> Say no to Food Wastage !</h5>
            <Link to='/features'><button className="b1">Features</button></Link>
          </div>
        </section>
      </div>
      <div className="container2">
        <img src={src3} className="mission"></img>
        <p className="missionpara">{missionparagraph}</p>
      </div>
      <div className="container3">
        <img src={src4} className="vision"></img>
        <p className="visionpara">{visionparagraph}</p>
      </div>
      <div className="container4">
        <h3 className="h3">
          Getting Started is Easy !
          <h4 className="fc">Food chains can do it in just 3 steps</h4>
        </h3>
        <img src={src5} className="starteasy"></img>
        <h2 className="h2">Create Dashboard </h2>
        <h2 className="Nh2">Subscription</h2>
        <h2 className="Nh3">Signup</h2>
      </div>
      <div className="container5">
        <h3 className="h3">We are available in these cities ! </h3>

        {/* Custom element cities, code for this element is in Cities.jsx */}
        <Cities imgsrc=" Lahore.png " alt="lahore image" title="lahore" />
        <div>
          <img src="Gujranwala.png " alt="gjranwala image" className="g1"></img>
          <h2 className="g2">Gujranwala</h2>
        </div>
        <div>
          <img src="Faislabad.png" alt="faislabad" className="faislabad1"></img>
          <h2 className="faislabad2">Faislabad</h2>
        </div>
        <Footer></Footer>
      </div>
    </>
  );
}

export default Homepage;
