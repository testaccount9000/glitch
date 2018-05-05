import QuestionsPageTemplate from '../../templates/pages/questions';
import LayoutPresenter from '../layout';
import QuestionsPresenter from '../questions';
import Reactlet from '../reactlet';

import Categories from "../categories.jsx";

export default function(application) {
  const self = {

    application,

    questions() {
      return QuestionsPresenter(application, 12);
    },

    Categories() {
      const props = {
        categories: application.categories,
      };
     
      return Reactlet(Categories, props);
    },
  };
      
  const content = QuestionsPageTemplate(self);

  return LayoutPresenter(application, content);
}
