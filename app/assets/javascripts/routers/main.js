NewsClipr.Routers.Authentication = Backbone.Router.extend({
  initialize: function ($rootEl) {
    this.$rootEl = $rootEl;
  },

  routes: {
    "": "showStatus"
  },

  showStatus: function () {
    if (NewsClipr.currentUser) {
      var view = new NewsClipr.Views.loggedInView();
    } else {
      var view = new NewsClipr.Views.logInView();
    }
  }
})