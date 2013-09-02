NoteClipr.Views.NotesIndex = Backbone.View.extend({

  initialize: function () {
    // var renderCallback = this.render.bind(this);
    // this.listenTo(this.collection, "sync", renderCallback);
  },

  events: {
    "click ul#notes-index li": "showNotesForm"
  },

  template: JST['notes/index'],

  render: function () {
    this.$el.html(this.template({
      parentModel: this.model,
      collection: this.collection
    }));

    return this;
  },

  showNotesForm: function (event) {
    var noteId = $(event.currentTarget).data('id');
    NoteClipr.Store.Router.showNotesForm(noteId);
  },

  remove: function () {
    NoteClipr.Store.Router._removeNotesForm();
    Backbone.View.prototype.remove.call(this);
  }

});
