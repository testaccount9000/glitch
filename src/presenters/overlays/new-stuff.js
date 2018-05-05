import markdownFactory from 'markdown-it';
import markdownSanitizer from 'markdown-it-sanitizer';
const markdown = markdownFactory({html: true})
  .use(markdownSanitizer);
import Observable from 'o_0';
import OverlayNewStuffTemplate from '../../templates/overlays/new-stuff';
import newStuffLog from '../new-stuff-log';

export default function(application) {
  
  application.overlayNewStuffVisible.observe(function() {
    if (application.overlayNewStuffVisible() === true) {
      self.updateNewStuffRead();
      return self.newStuffNotificationVisible(false);
    }
  });

  var self = {

    newStuffLog: newStuffLog(self),
    
    newStuffNotificationVisible: Observable(false),
    newStuff: Observable([]),
    
    mdToNode(md) {
      const node = document.createElement('span');
      node.innerHTML = markdown.render(md);
      return node;
    },

    visibility() {
      if (!application.overlayNewStuffVisible()) { return "hidden"; }
    },
        
    getUpdates() {
      const MAX_UPDATES = 3;
      const updates = self.newStuffLog.updates();
      const newStuffReadId = application.getUserPref('newStuffReadId');
      const totalUpdates = self.newStuffLog.totalUpdates();
      
      const latestStuff = updates.slice(0, MAX_UPDATES);
      self.newStuff(latestStuff);

      let hasNewStuff = true;
      if (newStuffReadId) {
        const unread = totalUpdates - newStuffReadId;
        const newStuff = updates.slice(0, unread);
        if (unread <= 0) {
          hasNewStuff = false;
        } else {
          self.newStuff(newStuff);
        }
      }
            
      const isSignedIn = application.currentUser().isSignedIn();
      const ignoreNewStuff = application.getUserPref('showNewStuff') === false;
      const visible = isSignedIn && hasNewStuff && !ignoreNewStuff;
      
      return self.newStuffNotificationVisible(visible);
    },


    checked(event) {
      const showNewStuff = application.getUserPref('showNewStuff');
      if ((showNewStuff != null) && (event != null)) {
        return application.updateUserPrefs('showNewStuff', event);
      } else if (showNewStuff != null) {
        return showNewStuff;
      } 
      return application.updateUserPrefs('showNewStuff', true);
      
    },

    updateNewStuffRead() {
      return application.updateUserPrefs('newStuffReadId', self.newStuffLog.totalUpdates());
    },
      
    hiddenUnlessNewStuffNotificationVisible() {
      if (!self.newStuffNotificationVisible()) { return 'hidden'; }
    },
        
    showNewStuffOverlay() {
      return application.overlayNewStuffVisible(true);
    },
  };

  self.getUpdates();
  return OverlayNewStuffTemplate(self);
}
