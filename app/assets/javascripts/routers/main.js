NoteClipr.Routers.Main = Backbone.Router.extend({

  initialize: function (options) {
    this.$notesPanel = options.$notesPanel;
    this.$noteDetailPanel = options.$noteDetailPanel;

    this.collection = options.notebooks;
  },

  routes: {
    "notes": "notesPanel",
    "notebooks/:notebook_id/notes": "notesPanel",
    "notebooks/:notebook_id/notes/new": "newNoteDetailPanel",
    "notes/:id/edit": "updateNoteDetailPanel"
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
      collection: notes,
      notebook_id: notebook_id
    });

    this.currentNotesIndex = view;
    this.$notesPanel.html(view.render().$el);
  },

  newNoteDetailPanel: function (notebook_id) {
    var notes = this.collection.get(notebook_id).get("notes");
    var note = new NoteClipr.Models.Note();
    notes.add(note);
    NoteClipr.Store.notes.add(note);
    note.save({ notebook_id: notebook_id });

    this._noteDetailPanel(note);
  },

  updateNoteDetailPanel: function (id) {
    var note = NoteClipr.Store.notes.get(id);
    this._noteDetailPanel(note);
  },

  _noteDetailPanel: function (note) {
    this._removePanels();
    this.notesPanel(note.get("notebook_id"));

    var view = new NoteClipr.Views.NotesForm({
      model: note
    });

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