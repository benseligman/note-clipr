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

    var $notebookIndex = $("<div>");
    var $tagsIndex = $("<div>");
    var $staticPanel = $("<div class='panel left'>");
    $staticPanel.append($notebookIndex).append($tagsIndex);

    var $notesIndex = $("<div class='panel center'>");
    var $notesForm = $("<div class='panel right'>");
    $("body").append($staticPanel).append($notesIndex).append($notesForm);

    NoteClipr.Store.Router = new NoteClipr.Routers.Main({
      $notesIndex: $notesIndex,
      $notesForm: $notesForm,
      notebooks:  NoteClipr.Store.notebooks
    });


  var notebooksView = new NoteClipr.Views.NotebooksIndex({
    collection: NoteClipr.Store.notebooks
  });
  $notebookIndex.html(notebooksView.render().$el);

  var tagsView = new NoteClipr.Views.TagsIndex({
    collection: NoteClipr.Store.tags
  });
  $tagsIndex.html(tagsView.render().$el);

  Backbone.history.start();
  }
};
