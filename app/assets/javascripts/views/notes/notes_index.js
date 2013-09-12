NoteClipr.Views.NotesIndex = Backbone.View.extend({

  initialize: function (options) {
    this.currentNotebookId = options.currentNotebookId;
    this.activeNote = options.activeNote;

    var renderCallback = this.render.bind(this);
    this.listenTo(this.collection, "sort change destroy", renderCallback);
    this.listenTo(NoteClipr.Store.tags, "change", renderCallback);
  },

  events: {
    "click div#note-list div .trash": "removeNote",
    "click div#note-list div": "update",
    "click button#new-note": "new"
  },

  template: JST['notes/index'],

  makeElementsDraggable: function () {
    var $list = this.$el.find(".list-item");
    $list.draggable({
      revert: "invalid"
    });
  },

  render: function () {
    var activeTags = NoteClipr.Store.tags.activeOnly();
    var filteredNotes = this.collection.displayFilter({
      currentNotebookId: this.currentNotebookId,
      activeTags: activeTags
    });

    this.$el.html(this.template({
      collection: filteredNotes,
      inNotebook: !!(this.currentNotebookId),
      activeNote: this.activeNote
    }));

    this.makeElementsDraggable();

    return this;
  },

  removeNote: function (event) {
    event.stopPropagation();
    var noteId = $(event.currentTarget).data('id');
    var note = this.collection.get(noteId);
    note.destroy();
  },

  update: function (event) {
     var $target = $(event.currentTarget);
     var noteId = $target.data('id');

     NoteClipr.Store.Router.navigate("#/notes/" + noteId + "/edit",  { trigger: true });
  },

  new: function (event) {
    NoteClipr.Store.Router.navigate("#/notebooks/" + this.currentNotebookId + "/notes/new",  { trigger: true });
  }
});
