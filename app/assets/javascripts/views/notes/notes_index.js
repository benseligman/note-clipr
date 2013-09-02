NoteClipr.Views.NotesIndex = Backbone.View.extend({

  template: JST['notes/index'],

  render: function () {
    this.$el.html(this.template({
      parentModel: this.model,
      collection: this.collection
    }));

    return this;
  }

});
