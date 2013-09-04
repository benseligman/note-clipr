window.NoteClipr = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  Store: {},
  initialize: function(currentUser, notebooksData) {
    NoteClipr.Store.currentUser = currentUser;
    NoteClipr.Store.notes = new NoteClipr.Collections.Notes({}, {notebookId: undefined});
    NoteClipr.Store.tags = new NoteClipr.Collections.Tags();
    NoteClipr.Store.notebooks = new NoteClipr.Collections.Notebooks(notebooksData, {
      parse: true
    });

    var $notebookIndex = $("<div class='notebook-list'>");
    var $notesIndex = $("<div class='note-list'>");
    var $notesForm = $("<div class='note-form'>");
    $("body").append($notebookIndex).append($notesIndex).append($notesForm);

    NoteClipr.Store.Router = new NoteClipr.Routers.Main({
      $notesIndex: $notesIndex,
      $notesForm: $notesForm,
      notebooks:  NoteClipr.Store.notebooks
    });


  var notebooksView = new NoteClipr.Views.NotebooksIndex({ collection: NoteClipr.Store.notebooks });
  $notebookIndex.html(notebooksView.render().$el);

    Backbone.history.start();
  }
};
