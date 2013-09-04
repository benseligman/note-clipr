NoteClipr.Views.NotesForm = Backbone.View.extend({
  initialize: function (options) {
    this.notebook = NoteClipr.Store.notebooks.get(options.notebook_id);
    this.notes = this.notebook.get("notes");

    if (options.id) {
      this.model = this.notes.get(options.id);
    } else {
      this.model = new NoteClipr.Models.Note();
    }
  },

  events: {
    "submit form#note-edit": "saveNote"
  },

  template: JST['notes/form'],

  render: function () {

    var renderedTemplate = this.template({
      note: this.model
    });

    this.$el.html(renderedTemplate);
    return this;
  },

  saveNote: function (event) {
    event.preventDefault();
    var noteData = $(event.currentTarget).serializeJSON().note;
    noteData.id = this.model.id;

    var that = this;

    this.notes.create(noteData, {
      success: function (savedNote) {
        that.notes.sort();
        NoteClipr.notes.create(savedNote);
        that.remove();
      }
    });
  }

});
