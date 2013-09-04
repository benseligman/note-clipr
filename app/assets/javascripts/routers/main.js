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
    var notes = this.collection.get(notebook_id).get("notes");
    this.notesPanel(notebook_id);

    var note;
    if (id) {
      note = notes.get(id);
    } else {
      note = new NoteClipr.Models.Note();
      this.currentNotesIndex.collection.add(note);
      NoteClipr.Store.notes.add(note);
    }

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