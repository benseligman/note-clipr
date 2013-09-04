NoteClipr.Views.NotesForm = Backbone.View.extend({
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
    var that = this;
    this.model.save(noteData, {
      success: function (savedNote) {
        that.model.collection.sort();
        that.remove();
      }
    });
  }

});
