import React from 'react';
import Header from './Header';
import './Features.css';
import FoodwasteFeature from './FoodwasteFeature';
import CompostFeature from './CompostFeature';
import EducationFeature from './EducationFeature';
import BonusFeature from './BonusFeature';
import AnalyticsFeature from './AnalyticsFeature';

const Features = () => {
  return (
    <>
       <Header></Header>
       <FoodwasteFeature></FoodwasteFeature>
       <CompostFeature></CompostFeature>
       <EducationFeature></EducationFeature>
       <BonusFeature></BonusFeature>
       <AnalyticsFeature></AnalyticsFeature>
    </>
  );
};

export default Features;
