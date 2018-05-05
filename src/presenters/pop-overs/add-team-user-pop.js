import Observable from 'o_0';
import {debounce} from 'lodash';

import AddTeamUserTemplate from '../../templates/pop-overs/add-team-user-pop';
import UserResultPresenter from '../user-result';

export default function(application) {

  var self = {
  
    application,
    UserResultPresenter,
  
    query: Observable(""),

    hiddenUnlessAddTeamUserPopVisible() {
      if (!application.addTeamUserPopVisible()) { return 'hidden'; }
    },

    stopPropagation(event) {
      return event.stopPropagation();
    },
    
    hiddenUnlessSearching() {
      if (!application.searchingForUsers()) { return 'hidden'; }
    },

    spacekeyDoesntClosePop(event) {
      event.stopPropagation();
      return event.preventDefault();
    },      

    search(event) {
      const query = event.target.value.trim();
      self.query(query);
      application.searchingForUsers(true);
      return self.searchUsers(query);
    },

    searchUsers: debounce(function(query) {
      if (query.length) {
        return application.searchUsers(self.query());
      } 
      return application.searchingForUsers(false);
        
    }
      , 500),

    searchResults() {
      const MAX_RESULTS = 5;
      if (self.query().length) {
        return application.searchResultsUsers().slice(0, MAX_RESULTS);
      } 
      return [];
      
    },

    hiddenIfNoSearch() {
      if (!self.searchResults().length && !application.searchingForUsers()) {
        return 'hidden';
      }
    }, 
  };
            
  return AddTeamUserTemplate(self);
}
