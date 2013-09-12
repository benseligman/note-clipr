NoteClipr.Views.NotebooksIndex = Backbone.View.extend({
  initialize: function  () {
    var renderCallback = this.render.bind(this);
    this.listenTo(this.collection, "sort destroy", renderCallback);
    this.listenTo(NoteClipr.Store.notes, "change destroy", renderCallback);
  },

  events: {
    "click div#notebook-list div .trash": "removeNotebook",
    "click div#notebook-list div": "showNotesIndex"
  },

  template: JST['notebooks/index'],

  render: function () {
    var newForm = new NoteClipr.Views.NotebooksForm({
      collection: this.collection
    });
    var subView = newForm.render().$el;

    this.$el.html(subView);
    this.$el.append(this.template({
      collection: this.collection
    }));

    this.makeNotebooksDroppable();

    return this;
  },

  makeNotebooksDroppable: function () {
    var that = this;
    var $list = this.$el.find(".notebook-item");
    $list.droppable({
      hoverClass: "active",
      accept: function (dragged) {
        var note = NoteClipr.Store.notes.get(dragged.data("id"));
        var newNotebookId = $(this).data("id");
        return note.get("notebook_id") != newNotebookId;
      },

      drop: function (event, ui){
        var $dragged = $(ui.draggable);
        var note = NoteClipr.Store.notes.get($dragged.data("id"));
        var newNotebookId = $(this).data("id");

        note.save({notebook_id: newNotebookId});
        $dragged.remove();
      }
    });
  },

  removeNotebook: function (event) {
    event.stopPropagation();
    var notebookId = $(event.currentTarget).data('id');
    var notebook = this.collection.get(notebookId);
    notebook.destroy();
    NoteClipr.Store.router.navigate("#", { trigger: true });
  },


  showNotesIndex: function (event) {
    var $target = $(event.currentTarget);
    var notebookId = $target.data('id');
    this._swapActiveNotebook($target);

    var formUrl;
    if (notebookId) {
      formUrl = "#/notebooks/" + notebookId + "/notes";
    } else {
      formUrl = "#/notes";
    }
    NoteClipr.Store.router.navigate(formUrl, { trigger: true });
  },

  _swapActiveNotebook: function ($target) {
    this.$activeEl && this.$activeEl.removeClass("active");
    $target.addClass("active");
    this.$activeEl = $target;
  }
});
