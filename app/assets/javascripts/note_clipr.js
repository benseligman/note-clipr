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

    var $notebookIndex = $("<div class='notebook-list'>");
    var $notesIndex = $("<div class='note-list'>");
    var $notesForm = $("<div class='note-form'>");
    $("body").append($notebookIndex).append($notesIndex).append($notesForm);

    NoteClipr.Store.Router = new NoteClipr.Routers.Main({
      $notebookIndex: $notebookIndex,
      $notesIndex: $notesIndex,
      $notesForm: $notesForm,
      notebooks: notebooks
    });

    Backbone.history.start();
  }
};
