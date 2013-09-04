NoteClipr.Views.NotesIndex = Backbone.View.extend({

  initialize: function (options) {

    this.notebook_id = options.notebook_id;
    var renderCallback = this.render.bind(this);
    this.listenTo(this.collection, "sort", renderCallback);
    this.listenTo(this.collection, "change", renderCallback);
  },

  events: {
    "click ul#notes-index li": "update",
    "click button#new-note": "new"
  },

  template: JST['notes/index'],

  render: function () {
    this.$el.html(this.template({
      collection: this.collection,
      inNotebook: !!(this.notebook_id)
    }));

    return this;
  },

  update: function (event) {
     var noteId = $(event.currentTarget).data('id');
     var note = this.collection.get(noteId);
     NoteClipr.Store.Router.navigate("#/notes/" + noteId + "/edit",  { trigger: true });
  },

  new: function (event) {
    NoteClipr.Store.Router.navigate("#/notebooks/" + this.notebook_id + "/notes/new",  { trigger: true });
  }

});
