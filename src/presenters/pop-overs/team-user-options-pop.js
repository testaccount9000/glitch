import UserResultPresenter from '../user-result';

export default function(application, user) {

  return {
  
    application,
    user,
    UserResultPresenter,

    stopPropagation(event) {
      return event.stopPropagation();
    },

    userCover() {
      return user.coverUrl('small');
    },
      
    userAvatarBackground() {
      return {backgroundColor: user.color()};
    },
  
    userLink() {
      return user.userLink();
    },

    removeUser() {
      return application.team().removeUser(application, user);
    },
    
    name() {
      return user.name();
    },
    
    avatarUrl() {
      return user.userAvatarUrl('small');
    },
    
    hiddenIfUserIsCurrentUser() {
      if (user.isCurrentUser(application)) { return 'hidden'; }
    },
    
    hiddenUnlessUserIsCurrentUser() {
      if (!user.isCurrentUser(application)) { return 'hidden'; }
    },
  };
}

