NoteClipr.Views.NotebooksIndex = Backbone.View.extend({
  initialize: function  () {
    var renderCallback = this.render.bind(this);
    this.listenTo(this.collection, "sort", renderCallback);
    this.listenTo(NoteClipr.Store.notes, "change", renderCallback);
  },

  events: {
    "click ul#notebook-list li": "showNotesIndex"
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
    var notebookId = $(event.currentTarget).data('id');
    var formUrl;
    if (notebookId) {
      formUrl = "#/notebooks/" + notebookId + "/notes";
    } else {
      formUrl = "#/notes";
    }
    NoteClipr.Store.Router.navigate(formUrl, { trigger: true });
  }
});
