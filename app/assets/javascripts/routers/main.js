NoteClipr.Routers.Main = Backbone.Router.extend({

  initialize: function (options) {

    this.$notebookList = options.$notebookList;
    this.$notesList = options.$notesList;
    this.$notesForm = options.$notesForm;

    this.collection = options.notebooks;
  },

  routes: {
    "": "showNotebooksList"
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

    this.currentNotesList = view;
    this.$notesList.html(view.render().$el);
  },

  _removeNotesList: function () {
    if (typeof this.currentNotesList === "object") {
      this.currentNotesList.remove();
    }
  },

  _removeNotesForm: function () {
    if (typeof this.currentNoteFrom === "object") {
      this.currentNotesForm.remove();
    }
  },

  showNotesForm: function (noteId) {
    this._removeNotesForm();

    var note = this.currentNotesList.collection.get(noteId);
    var view = new NoteClipr.Views.NotesForm({
      model: note
    });

    this.currentNotesForm = view;
    this.$notesForm.html(view.render().$el);
  }

});