import OverlayVideoTemplate from '../../templates/overlays/overlay-video';

export default function(application) {

  const self = {     
    application,
    
    hiddenUnlessOverlayVideoVisible() {
      if (!application.overlayVideoVisible()) { return "hidden"; }
    },

    stopPropagation(event) {
      return event.stopPropagation();
    },
  };

  return OverlayVideoTemplate(self);
}
