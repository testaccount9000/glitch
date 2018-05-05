import CategoryPageTemplate from '../../templates/pages/category';
import LayoutPresenter from '../layout';

import {ProjectsUL} from "../projects-list.jsx";
import Categories from "../categories.jsx";
import Reactlet from "../reactlet";

export default function(application) {

    
  var self = {

    application,
    category: application.category,

    projects() {
      const projects = self.category().projects().filter(project => project.fetched());
      const props = {
        closeAllPopOvers: application.closeAllPopOvers, 
        projects: projects.map(project => project.asProps()),
        categoryColor: self.category().color(),
      };
      return Reactlet(ProjectsUL, props);
    },

    Categories() {
      const props = {
        categories: application.categories,
      };
      return Reactlet(Categories, props);
    },

    name() {
      return self.category().name();
    },

    avatarUrl() {
      return self.category().avatarUrl();
    },

    description() {
      return self.category().description();
    },

    backgroundColor() {
      return self.category().backgroundColor();
    },

    style() {
      return {backgroundColor: self.backgroundColor()};
    },

    hiddenIfCategoryProjectsLoaded() {
      if (application.categoryProjectsLoaded()) { return 'hidden'; }
    },
  };
    
  const content = CategoryPageTemplate(self);
  return LayoutPresenter(application, content);
}

