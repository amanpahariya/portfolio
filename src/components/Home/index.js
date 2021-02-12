import React from 'react';
import './index.css';

import image from '../../undraw.svg'


function Home() {

  return (
    <main>
      <div className="intro">
        <div>
          <p>HEY ! I AM</p>
          <h1>Shainki Gupta</h1>
          <div>
            <h4>I'm a Senior Business Development Executive.</h4>
            <div className="hiders">
              <p>&nbsp;</p>
              <p>&nbsp;</p>
            </div>
          </div>
        </div>
      </div>
      <img className="home-image" src={image} />
    </main>
  );
}

export default Home;
