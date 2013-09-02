window.NoteClipr = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function(currentUser, noteBooks) {
    NoteClipr.currentUser = currentUser;

    $("body").append($login).append($content, noteBooks);
    var mainRouter = new NoteClipr.Routers.Main($content);
  }
};
