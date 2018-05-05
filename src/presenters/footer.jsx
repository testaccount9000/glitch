import React from 'react';
import PropTypes from 'prop-types';

function FooterLine({href, track, children}) {
  return <p><a href={href} data-track={'footer → '+track}>{children}</a></p>;
}
FooterLine.propTypes = {
  href: PropTypes.string.isRequired,
  track: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default function Footer() {
  const srcForPlatforms = "https://cdn.glitch.com/be1ad2d2-68ab-404a-82f4-6d8e98d28d93%2Ffor-platforms-icon.svg?1506442305188";
  return (
    <footer role="contentinfo">
      <FooterLine href="https://glitch.com/about" track="about">
        About Glitch <span role="img" aria-label="">🔮</span>
      </FooterLine>
      <FooterLine href="https://medium.com/glitch" track="blog">
        Blog <span role="img" aria-label="">📰</span>
      </FooterLine>
      <FooterLine href="https://glitch.com/faq" track="faq">
        FAQ <span role="img" aria-label="">☂️</span>
      </FooterLine>
      <FooterLine href="http://status.glitch.com/" track="system status">
        System Status <span role="img" aria-label="">🚥</span>
      </FooterLine>
      <FooterLine href="https://support.glitch.com" track="support forum">
        Support Forum <span role="img" aria-label="">🚑</span>
      </FooterLine>
      <FooterLine href="https://glitch.com/legal" track="legal stuff">
        Legal Stuff <span role="img" aria-label="">👮‍</span>
      </FooterLine>
      <FooterLine href="https://www.fogcreek.com/jobs/GlitchDesignEngineer" track="hiring">
        Pssst... we're hiring a Design Engineer! <span role="img" aria-label="">🙋‍</span>
      </FooterLine>
      <hr/>
      <FooterLine href="https://glitch.com/forteams" track="platforms">
        <img className="for-platforms-icon" src={srcForPlatforms} alt=""/>
        <span className="for-platforms-text">Glitch for Teams</span>
      </FooterLine>
    </footer>
  );
}