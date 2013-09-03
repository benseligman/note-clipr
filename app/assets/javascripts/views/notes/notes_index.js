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
      parentModel: this.model,
      collection: this.collection
    }));

    return this;
  },

  update: function (event) {
    var noteId = $(event.currentTarget).data('id');
    this._requestNoteForm(noteId);
  },

  new: function (event) {
    this._requestNoteForm("new");
  },

  _requestNoteForm: function (noteId) {
    var formUrl = "#/notebooks/" + this.collection.notebookId + "/notes/" + noteId;
    NoteClipr.Store.Router.navigate(formUrl);
  }

});
