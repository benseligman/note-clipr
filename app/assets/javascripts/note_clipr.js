window.NoteClipr = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function(currentUser) {
    NoteClipr.currentUser = currentUser;
    $("body").append($login).append($content);
    var mainRouter = new NoteClipr.Routers.Main($content);
  }
};

$(document).ready(function(){
  NoteClipr.initialize();
});
