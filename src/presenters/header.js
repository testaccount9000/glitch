/* global analytics */

import moment from 'moment-mini';

import HeaderTemplate from '../templates/includes/header';

import UserOptionsPop from "./pop-overs/user-options-pop.jsx";
import SignInPop from "./pop-overs/sign-in-pop.jsx";
import Reactlet from "./reactlet";

export default function(application) {
  
  const getTeamsPojo = function(teams) { 
    
    if (!teams || !teams.length) {
      return [];
    }
    
    // Teams load in two passes, first as an incomplete object,
    // then as a model. Filter out the incomplete teams.
    teams = teams.filter(team => team.I !== undefined);
    
    return teams.map(({name, url, teamAvatarUrl}) => ({
      name: name(),
      url: url(),
      teamAvatarUrl: teamAvatarUrl(),
    }));
  };

  var self = {

    application,
    baseUrl: application.normalizedBaseUrl(),
  
    toggleSignInPopVisible(event) {
      application.signInPopVisibleOnHeader.toggle();
      return event.stopPropagation();
    },

    toggleUserOptionsPopVisible(event) {
      application.userOptionsPopVisible.toggle();
      return event.stopPropagation();
    },

    hiddenUnlessUserIsExperienced() {
      if (!application.currentUser().isAnExperiencedUser()) { return 'hidden'; }
    },
      
    hiddenUnlessSignInPopVisible() {
      if (!application.signInPopVisibleOnHeader()) { return 'hidden'; }
    },

    userAvatar() {
      return application.currentUser().avatarUrl();
    },

    logo() {
      const LOGO_DAY = "https://cdn.gomix.com/2bdfb3f8-05ef-4035-a06e-2043962a3a13%2Flogo-day.svg";
      const LOGO_SUNSET = "https://cdn.gomix.com/2bdfb3f8-05ef-4035-a06e-2043962a3a13%2Flogo-sunset.svg";
      const LOGO_NIGHT = "https://cdn.gomix.com/2bdfb3f8-05ef-4035-a06e-2043962a3a13%2Flogo-night.svg";
      const hour = moment().format('HH');
      if ((hour >= 16) && (hour <=18)) {
        return LOGO_SUNSET;
      } else if ((hour > 18) || (hour <= 8)) {
        return LOGO_NIGHT;
      } 
      return LOGO_DAY;
      
    },

    hiddenIfSignedIn() {
      if (application.currentUser().login()) { return 'hidden'; }
    },
        
    hiddenUnlessSignedIn() {
      if (!application.currentUser().login()) { return 'hidden'; }
    },
        
    SignInPop() {
      return Reactlet(SignInPop);
    },

    UserOptionsPop(visible) {
      const props = {
        visible,
        teams: getTeamsPojo(application.currentUser().teams()),
        profileLink: `/@${application.currentUser().login()}`,
        avatarUrl: application.currentUser().avatarUrl(),
        showNewStuffOverlay() {
          application.userOptionsPopVisible(false);
          return application.overlayNewStuffVisible(true);
        },
        signOut() {
          analytics.track("Logout");
          analytics.reset();
          localStorage.removeItem('cachedUser');
          return location.reload();
        },
      };

      return Reactlet(UserOptionsPop, props);
    },
    
    submit(event) {
      if (event.target.children.q.value.trim().length === 0) {
        return event.preventDefault();
      }
    },
  };
        
  return HeaderTemplate(self);
}
