window.NoteClipr = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  Store: {},
  initialize: function(currentUser, notebooksData) {
    NoteClipr.Store.currentUser = currentUser;
    NoteClipr.Store.notes = new NoteClipr.Collections.Notes(null, {notebookId: undefined});
    NoteClipr.Store.tags = new NoteClipr.Collections.Tags();
    NoteClipr.Store.notebooks = new NoteClipr.Collections.Notebooks(notebooksData, {
      parse: true
    });
    NoteClipr.Store.searchTerms = "";

    var $searchPanel = $("div#search");
    var $notebooksTagsPanel = $("div#notebooks-tags");
    var $notebooksPanel = $("<div>");
    var $tagsPanel = $("<div>");
    $notebooksTagsPanel.append($notebooksPanel).append($tagsPanel);

    var $notesPanel = $("div#notes");
    var $noteDetailPanel = $("div#note-detail");


    NoteClipr.Store.Router = new NoteClipr.Routers.Main({
      $notesPanel: $notesPanel,
      $noteDetailPanel: $noteDetailPanel,
      notebooks:  NoteClipr.Store.notebooks
    });

    var searchView = new NoteClipr.Views.NotesSearch( {
      collection: NoteClipr.Store.notes
    });
    $searchPanel.html(searchView.render().$el);

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
