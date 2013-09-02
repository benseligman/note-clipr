NoteClipr.Views.NotesForm = Backbone.View.extend({

  events: {
    "submit form#note-edit": "saveNote"
  },

  template: JST['notes/form'],

  render: function () {
    this.$el.html(this.template({ note: this.model }));
    return this;
  },

  saveNote: function (event) {
    event.preventDefault();
    var noteData = $(event.currentTarget).serializeJSON().note;

    this.model.save(noteData);
  }

});
