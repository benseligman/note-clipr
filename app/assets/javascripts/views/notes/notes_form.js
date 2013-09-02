NoteClipr.Views.NotesForm = Backbone.View.extend({

  events: {
    "submit form#note-edit": "updateNote"
  },

  template: JST['notes/form'],

  render: function () {
    this.$el.html(this.template({ note: this.model }));
    return this;
  },

  updateNote: function (event) {
    event.preventDefault();
    var noteData = $(event.currentTarget).serializeJSON().note;

    this.model.save(noteData);
  }

});
