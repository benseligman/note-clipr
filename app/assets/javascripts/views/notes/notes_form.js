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
    var noteData = $(event.currentTarget).serializeJSON();

    var that = this;
    this.model.save(noteData, {
      parse: true,
      success: function () {
        that.model.collection.sort();
        NoteClipr.Store.notes.add(that.model);
        that.model.get("tags").each(function (tag) {
          NoteClipr.Store.tags.add(tag);
        });

        that.remove();
        var newUrl = "#/notebooks/" + that.model.get("notebook_id") + "/notes";
        NoteClipr.Store.Router.navigate(newUrl);
      }
    });
  }

});
