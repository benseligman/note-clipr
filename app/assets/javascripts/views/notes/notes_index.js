NoteClipr.Views.NotesIndex = Backbone.View.extend({

  initialize: function (options) {

    this.notebook_id = options.notebook_id;
    this.activeNote = options.activeNote;
    var renderCallback = this.render.bind(this);
    this.listenTo(this.collection, "sort", renderCallback);
    this.listenTo(this.collection, "change", renderCallback);
    this.listenTo(NoteClipr.Store.tags, "change", renderCallback);
  },

  events: {
    "click div#note-list div": "update",
    "click button#new-note": "new",
    "mouseenter div#note-list div": "highlight",
    "mouseleave div#note-list div": "removeHighlight"
  },

  template: JST['notes/index'],

  render: function () {
    var activeTags = NoteClipr.Store.tags.activeOnly();
    var filteredNotes = this.collection.tagFilter(activeTags).searchFilter();

    this.$el.html(this.template({
      collection: filteredNotes,
      inNotebook: !!(this.notebook_id),
      activeNote: this.activeNote
    }));

    return this;
  },

  update: function (event) {
     var $target = $(event.currentTarget);
     var noteId = $target.data('id');

     NoteClipr.Store.Router.navigate("#/notes/" + noteId + "/edit",  { trigger: true });
  },

  new: function (event) {
    NoteClipr.Store.Router.navigate("#/notebooks/" + this.notebook_id + "/notes/new",  { trigger: true });
  },

  highlight: function (event) {
    $(event.currentTarget).addClass("highlighted");
  },

  removeHighlight: function (event) {
    $(event.currentTarget).removeClass("highlighted");
  }
});
