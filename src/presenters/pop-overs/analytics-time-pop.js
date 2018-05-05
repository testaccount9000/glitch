import AnalyticsTimePopTemplate from '../../templates/pop-overs/analytics-time-pop';

export default function(application, analytics) {

  const self = {
  
    application,

    stopPropagation(event) {
      return event.stopPropagation();
    },

    selectMonthFrame() {
      analytics.analyticsTimeLabel('Last 4 Weeks');
      return analytics.gettingAnalyticsFromDate(true);
    },

    selectWeeksFrame() {
      analytics.analyticsTimeLabel('Last 2 Weeks');
      return analytics.gettingAnalyticsFromDate(true);
    },

    selectHoursFrame() {
      analytics.analyticsTimeLabel('Last 24 Hours');
      return analytics.gettingAnalyticsFromDate(true);
    },

    activeIfLabelIsMonths() {
      if (analytics.analyticsTimeLabel() === 'Last 4 Weeks') { return 'active'; }
    },

    activeIfLabelIsWeeks() {
      if (analytics.analyticsTimeLabel() === 'Last 2 Weeks') { return 'active'; }
    },

    activeIfLabelIsHours() {
      if (analytics.analyticsTimeLabel() === 'Last 24 Hours') { return 'active'; }
    },
  };


  return AnalyticsTimePopTemplate(self);
}
