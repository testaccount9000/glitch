import React from 'react';
/* global GITHUB_CLIENT_ID, FACEBOOK_CLIENT_ID, APP_URL */

function githubAuthLink() {
  var clientId, redirectUri, scope;
  clientId = GITHUB_CLIENT_ID;
  scope = "user:email";
  redirectUri = encodeURIComponent(`${APP_URL}/login/github`);
  return `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=${scope}&redirect_uri=${redirectUri}`;
}

function facebookAuthLink() {
  var callbackURL, clientId, scopes;
  clientId = FACEBOOK_CLIENT_ID;
  scopes = "email";
  callbackURL = encodeURIComponent(`${APP_URL}/login/facebook`);
  return "https://www.facebook.com/v2.9/dialog/oauth?" + `client_id=${clientId}&scope=${scopes}&redirect_uri=${callbackURL}`;
}

const SignInPopButton = (props) => (
  <a className="button-link" href={props.href}>
    <div className="button button-small">Sign in with {props.company}
      <span className={`emoji ${props.emoji}`}></span>
    </div>
  </a>
);

const SignInPop = () => (
  <div className="pop-over sign-in-pop">
    <section className="pop-over-actions last-section">
      <SignInPopButton href={facebookAuthLink()} company="Facebook" emoji="facebook"/>
      <SignInPopButton href={githubAuthLink()} company="GitHub" emoji="octocat"/>
    </section>
  </div>
);

export default SignInPop;
