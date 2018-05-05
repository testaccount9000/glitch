import React from 'react';

const FOUNDED = 2000;
const current = new Date().getFullYear();
const age = current - FOUNDED;
const logo = "https://cdn.glitch.com/2bdfb3f8-05ef-4035-a06e-2043962a3a13%2Ffogcreek.svg";
  
const ByFogCreek = () => (
  <section className="by-fogcreek" role="complementary">
    <h2>Made By Fog Creek</h2>
    <img src={logo} alt="Fog Creek logo"/>
    <p>
      You might know us for making Trello, <a href="https://manuscript.com/">Manuscript</a>, FogBugz, and co-creating Stack Overflow. 
      We're <a href="https://www.fogcreek.com">a friendly, self-funded company</a> that's
      been helping people make stuff for over {age} years.
    </p>
  </section>
);

export default ByFogCreek;
