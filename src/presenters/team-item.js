import TeamItemTemplate from '../templates/includes/team-item';
import UsersList from "./users-list.jsx";
import Reactlet from "./reactlet";

export default function(application, team) {

  var self = {
    application,
    team,

    name() {
      return team.name();
    },

    truncatedDescription() {
      return team.truncatedDescription();
    },

    UsersList() {
      const props = {
        users: team.users().map(user => user.asProps()),
      };
      return Reactlet(UsersList, props);
    },
    
    url() {
      return team.url();
    },
    
    coverUrl() {
      return team.coverUrl('small');
    },

    coverColor() {
      return team.coverColor();
    },

    thanks() {
      return team.teamThanks();
    },
    
    users() {
      return team.users();
    },
    
    avatarUrl() {
      return team.teamAvatarUrl();
    },

    hiddenUnlessThanks() {
      if (!(team.thanksCount() > 0)) { return 'hidden'; }
    },
    
    hiddenUnlessDescription() {
      if (!team.description()) { return 'hidden'; }
    },
  
    verifiedImage() {
      return team.verifiedImage();
    },
  
    verifiedTeamTooltip() {
      return team.verifiedTooltip();
    },
    
    hiddenUnlessVerified() {
      if (!team.isVerified()) { return 'hidden'; }
    },

    style() {
      return {
        backgroundImage: `url('${self.coverUrl()}')`,
        backgroundColor: self.coverColor(),
      };
    },
  };

  return TeamItemTemplate(self);
}
