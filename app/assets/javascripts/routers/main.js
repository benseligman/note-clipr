NoteClipr.Routers.Main = Backbone.Router.extend({

  initialize: function (options) {
    this.$notesPanel = options.$notesPanel;
    this.$noteDetailPanel = options.$noteDetailPanel;

    this.collection = options.notebooks;
  },

  routes: {
    "notes": "notesPanel",
    "notebooks/:notebook_id/notes": "notesPanel",
    "notebooks/:notebook_id/notes/new": "noteDetailPanel",
    "notebooks/:notebook_id/notes/:id/edit": "noteDetailPanel"
  },

  notesPanel: function (notebook_id) {
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
    this.$notesPanel.html(view.render().$el);
  },

  noteDetailPanel: function (notebook_id, id) {
    this._removePanels();

    var view = new NoteClipr.Views.NotesForm({
      notebook_id: notebook_id,
      id: id
    });

    this.notesPanel(notebook_id);
    this.currentNotesForm = view;
    this.$noteDetailPanel.html(view.render().$el);
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