NoteClipr.Views.NotebooksIndex = Backbone.View.extend({

  template: JST['notebooks/index'],

  render: function () {
    this.$el.html(this.template({ collection: this.collection}));
    return this;
  }

});
