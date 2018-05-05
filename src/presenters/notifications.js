import NotificationsTemplate from '../templates/includes/notifications';

const animationEnd = 'webkitAnimationEnd oanimationend msAnimationEnd animationend';

export default function(application) {

  // defined as observables in application.coffee
  const notificationTypes = [
    "UserDescriptionUpdated",
    "Uploading",
    "UploadFailure",
  ];

  const notifications = notificationTypes.map(str => `.notify${str}`).join(',');

  const generateNotifier = (method, application) =>
    function() {
      $(notifications).one(animationEnd, () => application[method](false));
      if (!application[method]()) {
        return "hidden";
      }
    }
  ;


  const self = {
    application,
    
    uploadFilesRemaining() {
      return Math.round((application.uploadFilesRemaining() / 2));
    },

    uploadProgress() {
      return application.uploadProgress();
    },
  };


  for (let notificationType of notificationTypes) {
    const method = `notify${notificationType}`;
    self[method] = generateNotifier(method, application);
  }

  return NotificationsTemplate(self);
}
