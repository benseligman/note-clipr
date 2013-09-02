window.NoteClipr = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function(currentUser, notebooksData) {
    NoteClipr.currentUser = currentUser;

    var notebooks = new NoteClipr.Collections.Notebooks(notebooksData);

    $rootEl = $("<div>");
    $("body").append($rootEl);
    var mainRouter = new NoteClipr.Routers.Main($rootEl, notebooks);

    Backbone.history.start();
  }
};
