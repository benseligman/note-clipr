NoteClipr.Views.NotebooksIndex = Backbone.View.extend({
  initialize: function  () {
    var renderCallback = this.render.bind(this);
    this.listenTo(this.collection, "sort", renderCallback);
    this.listenTo(NoteClipr.Store.notes, "change", renderCallback);
  },

  events: {
    "click div#notebook-list div": "showNotesIndex",
    "mouseenter div#notebook-list div": "highlight",
    "mouseleave div#notebook-list div": "removeHighlight"
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
    return this;
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
    NoteClipr.Store.Router.navigate(formUrl, { trigger: true });
  },

  highlight: function (event) {
    $(event.currentTarget).addClass("highlighted");
  },

  removeHighlight: function (event) {
    $(event.currentTarget).removeClass("highlighted");
  },

  _swapActiveNotebook: function ($target) {
    this.$activeEl && this.$activeEl.removeClass("active");
    $target.addClass("active");
    this.$activeEl = $target;
  }
});
