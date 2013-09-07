NoteClipr.Views.NotebooksForm = Backbone.View.extend({
  events: {
    "submit #new-notebook": "createNotebook"
  },

  template: JST['notebooks/form'],

  render: function () {
    this.$el.html(this.template());
    return this;
  },

  createNotebook: function (event) {
    event.preventDefault();

    var notebookData = $(event.currentTarget).serializeJSON().notebook;
    if (!notebookData.name) {
      return;
    }

    notebookData.notes = new NoteClipr.Collections.Notes();
    var that = this;
    this.collection.create(notebookData, {
      success: function  () {
        that.collection.sort();
      }
    });
  }

});
