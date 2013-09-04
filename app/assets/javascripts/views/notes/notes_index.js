NoteClipr.Views.NotesIndex = Backbone.View.extend({

  initialize: function () {
    var renderCallback = this.render.bind(this);
    this.listenTo(this.collection, "sync", renderCallback);
    this.listenTo(this.collection, "sort", renderCallback);
    this.listenTo(this.collection, "change", renderCallback);
  },

  events: {
    "click ul#notes-index li": "update",
    "click button#new-note": "new"
  },

  template: JST['notes/index'],

  render: function () {
    console.log("list notes: ");
    console.log(this.collection);
    this.$el.html(this.template({
      collection: this.collection
    }));

    return this;
  },

  update: function (event) {
     var noteId = $(event.currentTarget).data('id');
     var note = this.collection.get(noteId)
     NoteClipr.Store.Router.navigate("#/notebooks/" + note.get("notebook_id") + "/notes/" + noteId + "/edit",  { trigger: true });
  },

  new: function (event) {
    NoteClipr.Store.Router.navigate("#/notebooks/" + this.collection.notebookId + "/notes/new",  { trigger: true });
  }

});
