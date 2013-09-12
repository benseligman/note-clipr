window.NoteClipr = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  Store: {},
  initialize: function(currentUser, notebooksData, notesData) {
    // App-level variables
    NoteClipr.Store.currentUser = currentUser;
    NoteClipr.Store.tags = new NoteClipr.Collections.Tags();
    NoteClipr.Store.notes = new NoteClipr.Collections.Notes(notesData, {
      parse: true
    });
    NoteClipr.Store.notebooks = new NoteClipr.Collections.Notebooks(notebooksData, {
      parse: true
    });
    NoteClipr.Store.searchTerms = "";

    var $notesPanel = $("div#notes");
    var $noteDetailPanel = $("div#note-detail");

    NoteClipr.Store.router = new NoteClipr.Routers.Main({
      $notesPanel: $notesPanel,
      $noteDetailPanel: $noteDetailPanel,
      notebooks:  NoteClipr.Store.notebooks
    });

    NoteClipr.Store.setStaticPanels();

    Backbone.history.start();
  }
};
