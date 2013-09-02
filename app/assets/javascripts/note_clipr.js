window.NoteClipr = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  Store: {},
  initialize: function(currentUser, notebooksData) {
    NoteClipr.Store.currentUser = currentUser;

    var notebooks = new NoteClipr.Collections.Notebooks(notebooksData, {
      parse: true
    });

    $notebookList = $("<div class='notebook-list'>");
    $notesList = $("<div class='note-list'>");
    $("body").append($notebookList).append($notesList);
    NoteClipr.Store.Router = new NoteClipr.Routers.Main($notebookList, $notesList, notebooks);

    Backbone.history.start();
  }
};
