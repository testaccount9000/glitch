import Layout from '../templates/layout';
import Header from './header';
import Footer from './footer.jsx';
import OverlayProject from './overlays/overlay-project';
import OverlayVideo from './overlays/overlay-video';
import Notifications from './notifications';
import NewStuffPresenter from './overlays/new-stuff';

import Reactlet from './reactlet';

export default (application, content) =>

  Layout({

    header: Header(application),
    
    content,

    footer: Reactlet(Footer),
    
    overlayProject: OverlayProject(application),
    overlayVideo: OverlayVideo(application),
    notifications: Notifications(application),
    newStuff: NewStuffPresenter(application),
  });
