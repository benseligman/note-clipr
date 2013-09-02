NoteClipr.Views.NotebooksIndex = Backbone.View.extend({
  initialize: function  () {
    var renderCallback = this.render.bind(this);
    this.listenTo(this.collection, "sync", renderCallback);
  },

  events: {
    "click ul#notebook-list li": "showNotesIndex"
  },

  template: JST['notebooks/index'],

  render: function () {
    var newForm = new NoteClipr.Views.NotebooksForm({
      collection: this.collection
    });

    this.$el.html(newForm.render().$el);
    this.$el.append(this.template({ collection: this.collection }));
    return this;
  },

  showNotesIndex: function (event) {
    var notebookId = $(event.currentTarget).data('id');
    NoteClipr.Store.Router.showNotesIndex(notebookId);
  },

  remove: function () {
    NoteClipr.Store.Router._removeNotesIndex();
    Backbone.View.prototype.remove.call(this);
  }
});
