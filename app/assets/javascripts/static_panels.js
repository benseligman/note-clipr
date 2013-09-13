NoteClipr.Store.setStaticPanels = function () {
  var $searchPanel = $(".note-search");
  var $notebooksPanel = $("div#notebooks");
  var $tagsPanel = $("div#tags");
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
};