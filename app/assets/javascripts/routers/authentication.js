NewsClipr.Routers.Authentication = Backbone.Router.extend({
  initialize: function ($rootEl) {
    this.$rootEl = $rootEl;
  },

  routes: {
    "": "showStatus"
  }



});