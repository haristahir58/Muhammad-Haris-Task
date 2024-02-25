import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import './home.css';

const Home = () => {
  const [textIndex, setTextIndex] = useState(0);
  const texts = ['Learn MERN', 'Learn MEAN', 'Learn PHP'];

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 2000); // Change text every 3 seconds

    return () => clearInterval(interval);
  }, []); // Run only once on component mount

  return (
    <div className='home'>
      <Sidebar />
      <div className='homeContainer' style={{backgroundImage: 'linear-gradient(to right bottom, rgb(210, 0, 0), rgb(6, 3, 3))'}}>
        <div className='landing' style={{ textAlign: 'center' }}>
          <h1 className='heading1' style={{color:'white'}}>Welcome to GOMOBIT Test Website</h1>
          <div className='slider-container'>
            <h2 className='heading2'>{texts[textIndex]}</h2>
          </div>
          <p className='para1' style={{color:'white'}}>
            Confused on which course to take? I have got you covered. Browse courses and find out the best course
            for you. Its free! GOMOBIT Test Website is an attempt to teach basics and coding techniques to people in
            a short time, which took me ages to learn.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
