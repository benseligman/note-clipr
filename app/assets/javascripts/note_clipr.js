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

    var $notebookList = $("<div class='notebook-list'>");
    var $notesList = $("<div class='note-list'>");
    var $notesForm = $("<div class='note-form'>");
    $("body").append($notebookList).append($notesList).append($notesForm);

    NoteClipr.Store.Router = new NoteClipr.Routers.Main({
      $notebookList: $notebookList,
      $notesList: $notesList,
      $notesForm: $notesForm,
      notebooks: notebooks
    });

    Backbone.history.start();
  }
};
