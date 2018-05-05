import RecentProjectsTemplate from '../templates/includes/recent-projects';
import Loader from '../templates/includes/loader';

import {ProjectsUL} from "./projects-list.jsx";
import SignInPop from "./pop-overs/sign-in-pop.jsx";
import Reactlet from "./reactlet";

export default function(application) {

  const self = { 

    application,
    currentUser: application.currentUser(),

    style() {
      return {
        backgroundImage: `url('${application.currentUser().coverUrl('large')}')`,
        backgroundColor: application.currentUser().coverColor(),
      };
    },
    
    userAvatarStyle() {
      return {
        backgroundColor: application.currentUser().color(),
        backgroundImage: `url('${application.currentUser().userAvatarUrl('large')}')`,
      };
    },
    
    userAvatarUrl() {
      return application.currentUser().userAvatarUrl('large');
    },
    
    loader() {
      return Loader(self);
    },
    
    projects() {
      const projectsObservable = application.currentUser().projects;
      const projects = projectsObservable.slice(0,3);      
      
      if(projects.find(project => !project.fetched())){
        return self.loader();
      }
      
      const props = {
        closeAllPopOvers: application.closeAllPopOvers,
        projects: projects.map(project => project.asProps()),
      };

      return Reactlet(ProjectsUL, props);
    },
        
    SignInPop() {
      return Reactlet(SignInPop);
    },
    
    userAvatarIsAnon() {
      if (application.currentUser().isAnon()) { return 'anon-user-avatar'; }
    },

    toggleSignInPopVisible(event) {
      application.signInPopVisibleOnRecentProjects.toggle();
      return event.stopPropagation();
    },

    hiddenUnlessSignInPopVisible() {
      if (!application.signInPopVisibleOnRecentProjects()) { return 'hidden'; }
    },

    userLink() {
      return application.currentUser().userLink();
    },

    hiddenIfUserIsFetched() {
      if (application.currentUser().fetched()) { return 'hidden'; }
    },

    hiddenUnlessCurrentUser() {
      const currentAndFetched = application.currentUser().id() && application.currentUser().fetched();
      if (!currentAndFetched) { return 'hidden'; }
    },
  };

  return RecentProjectsTemplate(self);
}
