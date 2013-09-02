NoteClipr.Routers.Main = Backbone.Router.extend({

  initialize: function ($notebookList, $noteList, notebooks) {
    this.$notebookList = $notebookList;
    this.$noteList = $noteList;
    this.collection = notebooks;
  },

  routes: {
    "": "showNotebooksList"
  },

  remove: function  () {
    this._removeNotesList();
    Backbone.View.remove.call(this);
  },

  showNotebooksList: function () {
    var view = new NoteClipr.Views.NotebooksIndex({ collection: this.collection });
    this.$notebookList.html(view.render().$el);
  },

  showNotesList: function (notebookId) {
    this._removeNotesList();

    var notebook = this.collection.get(notebookId);

    var view = new NoteClipr.Views.NotesIndex({
      collection: notebook.get("notes"),
      model: notebook
    });

    this.currentNoteList = view;
    this.$noteList.html(view.render().$el);
  },

  _removeNotesList: function () {
    if (typeof this.currentNoteList === "object") {
      this.currentNoteList.remove();
    }
  }

});