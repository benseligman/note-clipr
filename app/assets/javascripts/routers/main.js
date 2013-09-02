NoteClipr.Routers.Main = Backbone.Router.extend({
  initialize: function ($rootEl, notebooks) {
    this.$rootEl = $rootEl;
    this.collection = notebooks;
  },

  routes: {
    "": "showNotebooksIndex"
  },

  showNotebooksIndex: function () {
    var view = new NoteClipr.Views.NotebooksIndex({ collection: this.collection });
    this.$rootEl.html(view.render().$el);
  }

});