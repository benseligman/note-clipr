NoteClipr.Routers.Main = Backbone.Router.extend({

  initialize: function (options) {

    this.$notebookIndex = options.$notebookIndex;
    this.$notesIndex = options.$notesIndex;
    this.$notesForm = options.$notesForm;

    this.collection = options.notebooks;
  },

  routes: {
    "": "showNotebooksIndex"
  },

  showNotebooksIndex: function () {
    var view = new NoteClipr.Views.NotebooksIndex({ collection: this.collection });
    this.$notebookIndex.html(view.render().$el);
  },

  showNotesIndex: function (notebookId) {
    this._removeNotesIndex();
    var notebook = this.collection.get(notebookId);

    var view = new NoteClipr.Views.NotesIndex({
      collection: notebook.get("notes"),
      model: notebook
    });

    this.currentNotesIndex = view;
    this.$notesIndex.html(view.render().$el);
  },

  _removeNotesIndex: function () {
    if (typeof this.currentNotesIndex === "object") {
      this.currentNotesIndex.remove();
    }
  },

  _removeNotesForm: function () {
    if (typeof this.currentNotesForm === "object") {
      this.currentNotesForm.remove();
    }
  },

  showNotesForm: function (noteId) {
    this._removeNotesForm();

    var note = this.currentNotesIndex.collection.get(noteId);
    var view = new NoteClipr.Views.NotesForm({
      model: note
    });

    this.currentNotesForm = view;
    this.$notesForm.html(view.render().$el);
  }

});