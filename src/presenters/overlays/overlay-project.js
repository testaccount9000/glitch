
/* global CDN_URL EDITOR_URL analytics*/

import OverlayProjectTemplate from '../../templates/overlays/overlay-project';

import UsersList from "../users-list.jsx";
import Reactlet from "../reactlet";
import markdownFactory from 'markdown-it';
import markdownSanitizer from 'markdown-it-sanitizer';
import markdownEmoji from 'markdown-it-emoji';
const markdown = markdownFactory({html: true})
  .use(markdownSanitizer)
  .use(markdownEmoji);

// currentPagePath = "/"

export default function(application) {
  console.log("overlay project presented");

  var self = { 
    
    application,
    project: application.overlayProject,
    
    projectUsers() {
      return self.project && self.project() && self.project().users && self.project().users();
    },

    UsersList() {
      const project = self.project();
      if (project) {
        const props = {
          users: project.users().map(user => user.asProps()),
          showAsGlitchTeam: project.showAsGlitchTeam && project.showAsGlitchTeam(),
        };
        return Reactlet(UsersList, props);
      }
    },
  
    overlayReadme() {
      const readme = self.project() && self.project().readme();
      if (readme) {
        return self.mdToNode(readme.toString());
      }
    },

    projectDomain() {
      return self.project() && self.project().domain();
    },

    projectId() {
      return self.project() && self.project().id();
    },

    currentUserIsInProject() {
      return self.project() && self.project().userIsCurrentUser(application);
    },

    hiddenIfCurrentUserInProject() {
      if (self.currentUserIsInProject()) { return 'hidden'; }
    },

    hiddenUnlessCurrentUserInProject() {
      if (!self.currentUserIsInProject()) { return 'hidden'; }
    },
      
    projectAvatar() {
      if (self.project()) {
        return `${CDN_URL}/project-avatar/${self.project().id()}.png`;
      }
    },
      
    showLink() { 
      return `https://${self.projectDomain()}.glitch.me`;
    },

    editorLink() {
      return `${EDITOR_URL}#!/${self.projectDomain()}`;
    },

    remixLink() {
      return `${EDITOR_URL}#!/remix/${self.projectDomain()}`;
    },
      
    trackRemix() {
      analytics.track("Click Remix", {
        origin: "project overlay",
        baseProjectId: self.projectId(),
        baseDomain: self.projectDomain(),
      }
      );
      return true;
    },

    hiddenUnlessOverlayProjectVisible() {
      if (!application.overlayProjectVisible()) { return "hidden"; }
    },

    stopPropagation(event) {
      return event.stopPropagation();
    },
      
    warningIfProjectNotFound() {
      if (self.project() && self.project().projectNotFound()) { return "warning"; }
    },

    hiddenUnlessProjectNotFound() {
      if (!(self.project() && self.project().projectNotFound())) { return 'hidden'; }
    }, 
        
    hiddenIfProjectNotFound() {
      if ((self.project() === undefined) || (self.project() && self.project().projectNotFound())) { return 'hidden'; }
    },
    
    hiddenUnlessReadmeNotFound() {
      if (!(self.project() && self.project().readmeNotFound())) { return 'hidden'; }
    },

    hiddenIfOverlayReadmeLoaded() {
      if ((self.project() && self.project().readme()) || (self.project() && self.project().projectNotFound()) || (self.project() && self.project().readmeNotFound())) {
        return 'hidden';
      }
    }, 
      
    hideOverlay() {
      return self.project().hideOverlay(application);
    },

    mdToNode(md) {
      const node = document.createElement('span');
      node.innerHTML = markdown.render(md);
      return node;
    },

    showReadmeError() {
      const node = document.createElement('span');
      node.innerHTML = 
      `\
<h1>Couldn't get project info</h1>
<p>Maybe try another project? Maybe we're too popular right now?</p>
<p>(シ_ _)シ</p>\
`;
      return self.overlayReadme(node);
    },
        
    projectThoughtsMailto() {
      const projectDomain = self.projectDomain();
      const projectId = self.projectId();
      const support = "customer-service@fogcreek.com";
      const subject = `[Glitch] I have feelings about ${projectDomain}`;
      const body = `\
What do you think of the ${projectDomain} project? 
Is it great? Should we feature it? Is it malicious?

Let us know:





--------------------

Thanks 💖

– Glitch Team

(project id: ${projectId})\
`;
      return encodeURI(`mailto:${support}?subject=${subject}&body=${body}`);
    },
  };


  return OverlayProjectTemplate(self);
}