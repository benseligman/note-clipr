NoteClipr.Views.NotesForm = Backbone.View.extend({

  initialize: function (options) {
    var notebook = this.collection.get(options.notebook_id);
    this.notes = notebook.get("notes");

    if (options.id) {
      this.model = this.notes.get(options.id);
    } else {
      this.model = new NoteClipr.Models.Note();
      this.model.set("notebook_id", notebook.id);
    }
  },

  events: {
    "submit form#note-edit": "saveNote"
  },

  template: JST['notes/form'],

  render: function () {
    var renderedTemplate = this.template({
      note: this.model,
      notebooks: this.collection
    });

    this.$el.html(renderedTemplate);
    return this;
  },

  saveNote: function (event) {
    event.preventDefault();
    var noteData = $(event.currentTarget).serializeJSON().note;
    noteData.id = this.model.id;

    if (noteData.notebook_id != this.notes.notebookId) {
      this.notes.remove(this.model);
      var notebook = this.collection.get(noteData.notebook_id);
      this.notes = notebook.get("notes");
    }

    var that = this;
    var newUrl = "/notebooks/" + noteData.notebook_id + "/notes/";

    this.notes.create(noteData, {
      success: function (savedNote) {
        that.notes.sort();
        NoteClipr.Store.Router.navigate(newUrl + savedNote.id, { trigger: true});

      }
    });


  }

});
