NoteClipr.Routers.Main = Backbone.Router.extend({

  initialize: function (options) {
    this.$notesIndex = options.$notesIndex;
    this.$notesForm = options.$notesForm;

    this.collection = options.notebooks;
  },

  routes: {
    "notes": "notesIndex",
    "notebooks/:notebook_id/notes": "notesIndex",
    "notebooks/:notebook_id/notes/new": "notesForm",
    "notebooks/:notebook_id/notes/:id/edit": "notesForm"
  },

  notesIndex: function (notebook_id) {
    this._removePanels();

    var notes;

    if (notebook_id) {
      var notebook = this.collection.get(notebook_id);
      notes = notebook.get("notes");
    } else {
      notes = NoteClipr.Store.notes;
    }

    var view = new NoteClipr.Views.NotesIndex({
      collection: notes
    });

    this.currentNotesIndex = view;
    this.$notesIndex.html(view.render().$el);
  },

  notesForm: function (notebook_id, id) {
    this._removePanels();

    var view = new NoteClipr.Views.NotesForm({
      notebook_id: notebook_id,
      id: id
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
  },

  _removeNotesForm: function () {
     if (typeof this.currentNotesForm === "object") {
      this.currentNotesForm.remove();
    }
  }

});