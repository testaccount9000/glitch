import IndexTemplate from '../../templates/pages/index';
import LayoutPresenter from '../layout';
import HeaderPresenter from '../header';
import FeaturedCollectionPresenter from '../featured-collection';
import RecentProjectsPresenter from '../recent-projects';
import QuestionsPresenter from '../questions';
import CategoryModel from '../../models/category';
import ProjectModel from '../../models/project';
import Reactlet from '../reactlet';
import EmbedHtml from '../../curated/embed';

import Categories from "../categories.jsx";
import RandomCategories from '../random-categories.jsx';
import WhatIsGlitch from "../what-is-glitch.jsx";
import ByFogCreek from "../includes/by-fogcreek.jsx";
import StarterApps from "../includes/starter-apps.jsx";

export default function(application) {
  console.log("Presented index");
  
  const self = {
    application,
    projects: application.projects,
    
    user: application.user,

    WhatIsGlitch() {
      
      const props = {
        isSignedIn() {
          return application.currentUser().isSignedIn();
        },
        showVideoOverlay(event) {
          application.overlayVideoVisible(true);
          document.getElementsByClassName('video-overlay')[0].focus();
          return event.stopPropagation();
        },
      };

      return Reactlet(WhatIsGlitch, props);
    },

    header() {
      return HeaderPresenter(application);
    },

    currentUser: application.currentUser,
    
    hiddenUnlessCurrentUser() {
      if (!application.currentUser().id()) { return 'hidden'; }
    },
      
    featuredCollections() {
      return application.featuredCollections.map(collection => FeaturedCollectionPresenter(application, collection));
    },
    
    randomCategories() {
      const props = {
        closeAllPopOvers: application.closeAllPopOvers,
        getCategories: () => CategoryModel.getRandomCategories(application.api()),
      };
      return Reactlet(RandomCategories, props);
    },
    
    embed() {
      const node = document.createElement('span');
      node.innerHTML = EmbedHtml;
      return node;
    },
   
    Categories() {
      const props = {
        categories: application.categories,
      };
      return Reactlet(Categories, props);
    },
    
    QuestionsPresenter() {
      return QuestionsPresenter(application);
    },
    
    RecentProjectsPresenter() {
      return RecentProjectsPresenter(application);
    },
    
    ByFogCreek() {
      return Reactlet(ByFogCreek, null);
    },

    StarterApps() {
      const projectIds = [
        'a0fcd798-9ddf-42e5-8205-17158d4bf5bb', // 'hello-express'
        'cb519589-591c-474f-8986-a513f22dbf88', // 'hello-sqlite'
        '929980a8-32fc-4ae7-a66f-dddb3ae4912c', // 'hello-webpage'
      ];
      const projects = ProjectModel.getProjectsByIds(application.api(), projectIds);
      const fetchedProjects = projects.filter(project => project.fetched());
      const starterProjects = fetchedProjects.map((project) => {
        const {domain, description, avatar} = project;
        return {
          title: domain(),
          domain: domain(),
          description: description(),
          avatar: avatar(),
          showOverlay() { project.showOverlay(application); },
        }; 
      });
      
      return Reactlet(StarterApps, {starterProjects});
    },
  };

  const content = IndexTemplate(self);

  return LayoutPresenter(application, content);
}
