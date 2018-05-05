import Observable from 'o_0';

import AnalyticsProjectsPopTemplate from '../../templates/pop-overs/analytics-projects-pop';
import ProjectResultPresenter from '../project-result';

export default function(application, analytics) {

  var self = {
  
    application,  
    teamProjects: Observable(application.team().projects()),
    analytics,
    ProjectResultPresenter,
    
    stopPropagation(event) {
      return event.stopPropagation();
    },

    filter(event) {
      const query = event.target.value.trim();
      const projects = application.team().projects();
      if (query.length) {
        const filtered = projects.filter(project => project.domain().match(query) || project.description().match(query));
        return self.teamProjects(filtered);
      } 
      return self.teamProjects(projects);
      
    },

    spacekeyDoesntClosePop(event) {
      event.stopPropagation();
      return event.preventDefault();
    },

    activeIfAllProjects() {
      if (analytics.analyticsProjectDomain() === 'All Projects') { return 'active'; }
    },

    selectAllProjects() {
      return analytics.analyticsProjectDomain('All Projects');
    },
  };
        
  return AnalyticsProjectsPopTemplate(self);
}
