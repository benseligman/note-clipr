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

    var $notebooksTagsPanel = $("div#notebooks-tags");
    var $notebooksPanel = $("<div class='row'>");
    var $tagsPanel = $("<div class='row'>");
    $notebooksTagsPanel.append($notebooksPanel).append($tagsPanel);

    var $notesPanel = $("div#notes");
    var $noteDetailPanel = $("div#note-detail");


    NoteClipr.Store.Router = new NoteClipr.Routers.Main({
      $notesPanel: $notesPanel,
      $noteDetailPanel: $noteDetailPanel,
      notebooks:  NoteClipr.Store.notebooks
    });


  var notebooksView = new NoteClipr.Views.NotebooksIndex({
    collection: NoteClipr.Store.notebooks
  });
  $notebooksPanel.html(notebooksView.render().$el);

  var tagsView = new NoteClipr.Views.TagsIndex({
    collection: NoteClipr.Store.tags
  });
  $tagsPanel.html(tagsView.render().$el);

  Backbone.history.start();
  }
};
