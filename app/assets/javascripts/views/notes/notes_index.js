NoteClipr.Views.NotesIndex = Backbone.View.extend({

  initialize: function () {
    var renderCallback = this.render.bind(this);
    this.listenTo(this.collection, "sync", renderCallback);
  },

  events: {
    "click ul#notes-index li": "update",
    "click button#new-note": "new"
  },

  template: JST['notes/index'],

  render: function () {
    this.$el.html(this.template({
      collection: this.collection
    }));

    return this;
  },

  update: function (event) {
     var noteId = $(event.currentTarget).data('id');
     NoteClipr.Store.Router.navigate("#/notebooks/" + this.collection.notebookId + "/notes/" + noteId + "/edit",  { trigger: true });
  },

  new: function (event) {
    NoteClipr.Store.Router.navigate("#/notebooks/" + this.collection.notebookId + "/notes/new",  { trigger: true });
  }

});
