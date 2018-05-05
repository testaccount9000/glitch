/* global application CDN_URL EDITOR_URL*/
import {find} from 'lodash';

let Project;
const cache = {};

import Model from './model';
import axios from 'axios';

let source = undefined; // reference to cancel token
let originalUrlPath = "/";
let originalQueryString = "";

export default Project = function(I, self) {
  
  if (I == null) { I = {}; }
  if (self == null) { self = Model(I); }
  if (cache[I.id]) {
    return cache[I.id];
  }

  self.defaults(I, {
    domain: undefined,
    id: undefined,
    description: undefined,
    users: undefined,
    showAsGlitchTeam: false,
  }
  );

  self.attrObservable(...Array.from(Object.keys(I) || []));
  self.attrObservable("readme", "readmeNotFound", "projectNotFound", "fetched", "displayName", "private");
  self.attrModels('users', User);

  self.extend({
    
    asProps() {
      const project = self;

      return {
        avatar: project.avatar(),
        description: project.description(),
        domain: project.domain(),
        id: project.id(),
        isPinnedByTeam: project.isPinnedByTeam(application),
        isPinnedByUser: project.isPinnedByUser(application),
        isRecentProject: !!(project.isRecentProject),
        link: project.isRecentProject ? project.editUrl() : `/~${project.domain()}`,
        name: project.name(),
        private: project.private(),
        showAsGlitchTeam: !!(project.showAsGlitchTeam && project.showAsGlitchTeam()),
        showOverlay: () => {
          project.showOverlay(application);
        },
        users: project.users().map(user => user.asProps()),
      };
    },

    name() {
      return self.domain();
    },
  
    editUrl() {
      if (I.line) {
        return `${EDITOR_URL}#!/${I.domain}?path=${I.path}:${I.line}:${I.character}`;
      }
      return `${EDITOR_URL}#!/${I.domain}`;
    },

    userIsCurrentUser(application) {
      const userIsCurrentUser = find(self.users(), user => user.id() === application.currentUser().id());
      return !!userIsCurrentUser;
    },

    avatar() {
      return `${CDN_URL}/project-avatar/${self.id()}.png`;
    },
        
    getReadme(application) {
      if (self.id() === undefined) {
        self.readmeNotFound(true);
        self.projectNotFound(true);
        return;
      }
      
      const { CancelToken } = axios;
      source = CancelToken.source();
      self.readme(undefined);
      self.readmeNotFound(undefined);
      self.projectNotFound(undefined);
      let path = `projects/${self.id()}/readme`;
      let token = application.currentUser() && application.currentUser().persistentToken();
      if(token){
        path += `?token=${token}`;
      }
      return application.api(source).get(path)
        .then(function(response) {
          self.readme(response.data);
          return application.overlayProject(self);}).catch(function(error) {
          console.error("getReadme", error);
          if (error.response.status === 404) {
            return self.readmeNotFound(true);
          } 
          return self.projectNotFound(true);
        
        });
    },

    showOverlay(application) {
      console.log('showOverlay');
      application.overlayProject(self);
      self.getReadme(application);
      originalUrlPath = window.location.pathname;
      originalQueryString = window.location.search;
      if((originalUrlPath+originalQueryString).includes("~")) {
        //They navigated here directly.
        originalUrlPath = "/";
        originalQueryString = '';
      }
      if(!self.domain()) {
        return;
      }
      const target = `/~${self.domain()}`;
      history.replaceState(null, `${self.domain()} – Glitch`, target);
      application.overlayProjectVisible(true);
      return document.getElementsByClassName('project-overlay')[0].focus();
    },

    hideOverlay() {
      source.cancel('Operation canceled by the user.');
      return history.replaceState(null, null, originalUrlPath + originalQueryString);
    },

    pushSearchResult(application) {
      application.searchResultsProjects.push(self);
      return application.searchResultsProjectsLoaded(true);
    },

    isPinnedByUser(application) {
      return Project.isPinnedByUser(application.user(), self.id());
    },

    isPinnedByTeam(application) {
      return Project.isPinnedByTeam(application.team(), self.id());
    },
           
    delete() {
      const projectPath = `/projects/${self.id()}`;
      return new Promise(function(resolve, reject) {
        return application.api().delete(projectPath)
          .then(response => resolve(response)).catch(function(error) {
            reject(error);
            return console.error('deleteProject', error);
          });
      });
    },
      
    undelete() {
      const projectPath = `/projects/${self.id()}/undelete`;
      return new Promise(function(resolve, reject) { 
        return application.api().post(projectPath)
          .then(response => resolve(response)).catch(function(error) {
            console.error('undeleteProject', error);
            return reject(error);
          });
      });
    },
    
    leave() {
      const projectAuthPath = `/projects/${self.id()}/authorization`;
      const config = {
        data: { 
          targetUserId: application.currentUser().id(),
        },
      };
      return new Promise(function(resolve, reject) {
        return application.api().delete(projectAuthPath, config)
          .then(response => resolve(response)).catch(function(error) {
            console.error('leaveProject', error);
            return reject(error);
          });
      });
    },
  });
      
  cache[I.id] = self;
  // console.log '💎 project cache', cache

  return self;
};

Project.isPinnedByUser = (user, projectId) => {
  const pins = user.pins().map(pin => pin.projectId);
  return pins.includes(projectId);
};

Project.isPinnedByTeam = function(team, projectId) {
  const pins = team.pins().map(pin => pin.projectId);
  return pins.includes(projectId);
};

// Fetch projects and populate them into the local cache
Project.getProjectsByIds = function(api, ids) {
  const NUMBER_OF_PROJECTS_PER_REQUEST = 40;
  const newProjectIds = ids.filter(function(id) {
    const project = cache[id];
    return !project || !project.fetched();
  });
  
  // fetch the ids in groups so they fit into max allowable url length
  const projectIdGroups = newProjectIds.map(function(id, index) {
    if ((index % NUMBER_OF_PROJECTS_PER_REQUEST) === 0) { 
      return newProjectIds.slice(index, index + NUMBER_OF_PROJECTS_PER_REQUEST);       
    }  return null; }).filter(id => id);
  
  projectIdGroups.map(function(group) {
    const projectsPath = `projects/byIds?ids=${group.join(',')}`;
    return api.get(projectsPath)
      .then(function({data}) {
        data.map(function(datum) {
          datum.fetched = true;
          return Project(datum).update(datum);
        }); 
      })
      .catch(error => console.error("getProjectsByIds", error));
  });
  
  return ids.map(id => Project({id}));
};

Project.getProjectOverlay = function(application, domain) {
  const projectPath = `projects/${domain}`;
  application.overlayProjectVisible(true);
  return application.api().get(projectPath)
    .then(function({data}) {
      if (!data) {
        const project = Project({domain});
        project.projectNotFound(true);
        project.showOverlay(application);
        return;
      }
    
      return Project(data).showOverlay(application);}).catch(error => console.error("getProjectOverlay", error));
};

Project.getSearchResults = function(application, query) {
  const MAX_RESULTS = 20;
  const { CancelToken } = axios;
  source = CancelToken.source();
  application.searchResultsUsers([]);
  application.searchingForProjects(true);
  const searchPath = `projects/search?q=${query}`;
  return application.api(source).get(searchPath)
    .then(function({data}) {
      application.searchingForProjects(false);
    
      let projects = data;

      // Remove not-safe-for-kids results
      projects = projects.filter(project => project.notSafeForKids === false);
    
      projects = projects.slice(0 , MAX_RESULTS);
      if (projects.length === 0) {
        application.searchResultsHaveNoProjects(true);
      }
      return projects.forEach(function(project) {
        project.fetched = true;
        return Project(project).update(project).pushSearchResult(application);
      });}).catch(error => console.error('getSearchResults', error));
};


Project._cache = cache;

// Circular dependencies must go below module.exports
import User from './user';
