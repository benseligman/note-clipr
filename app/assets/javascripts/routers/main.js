NoteClipr.Routers.Main = Backbone.Router.extend({

  initialize: function (options) {
    this.$notesIndex = options.$notesIndex;
    this.$notesForm = options.$notesForm;

    this.collection = options.notebooks;
  },

  routes: {
    "notebooks/:id": "notesIndex",
    "notebooks/:notebook_id/notes/new": "notesForm",
    "notebooks/:notebook_id/notes/:id": "notesForm"
  },

  notesIndex: function (id) {
    this._removePanels();

    var notebook = this.collection.get(id);

    var view = new NoteClipr.Views.NotesIndex({
      collection: notebook.get("notes"),
      model: notebook
    });

    this.currentNotesIndex = view;
    this.$notesIndex.html(view.render().$el);
  },

  notesForm: function (notebook_id, id) {
    this._removePanels();

    var view = new NoteClipr.Views.NotesForm({
      id: id,
      notebook_id: notebook_id,
      collection: this.collection
    });

    this.notesIndex(notebook_id);

    this.currentNotesForm = view;
    this.$notesForm.html(view.render().$el);
  },

  _removePanels: function () {
    if (typeof this.currentNotesIndex === "object") {
      this.currentNotesIndex.remove();
    }

    if (typeof this.currentNotesForm === "object") {
      this.currentNotesForm.remove();
    }
  }

});