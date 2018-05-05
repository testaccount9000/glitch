import React from 'react';
import PropTypes from 'prop-types';

const play = "https://cdn.hyperdev.com/6ce807b5-7214-49d7-aadd-f11803bc35fd%2Fplay.svg";
const whatsGlitchWide = "https://cdn.glitch.com/f7224274-1330-4022-a8f2-8ae09dbd68a8%2Fwhats-glitch-wide.svg?1499885209761";
const whatsGlitchNarrow = "https://cdn.glitch.com/f7224274-1330-4022-a8f2-8ae09dbd68a8%2Fwhats-glitch-narrow.svg?1499884900667";
const free = "https://cdn.glitch.com/2bdfb3f8-05ef-4035-a06e-2043962a3a13%2Ffree.svg?1499350845981";

const whatsGlitchAlt = "Create a node app, or remix one. It updates as you type. Code with Friends!";
  
const WhatIsGlitch = ({isSignedIn, showVideoOverlay}) => {
  if (isSignedIn()) {
    return null;
  }
  
  return (
    <section className="what-is-glitch">
      <h2>How It Works</h2>
      <span>
        <a href="https://glitch.com/about">
          <figure title="How Glitch works">
            <img className="wide" src={whatsGlitchWide} alt={whatsGlitchAlt}/>
            <img className="narrow" src={whatsGlitchNarrow} alt={whatsGlitchAlt}/>
          </figure>
        </a>
        <div>
          <span>And it's <img className="free" src={free} alt="free"/></span>
          <span>. </span>
          <button className="video" onClick={showVideoOverlay}>
            <img className="play-button" src={play} alt="play"/>
            <span>How it works in 1 minute</span>
          </button>
        </div>
      </span>
    </section>
  );
};

WhatIsGlitch.propTypes = {
  isSignedIn: PropTypes.func.isRequired,
  showVideoOverlay: PropTypes.func.isRequired,
};

export default WhatIsGlitch;
