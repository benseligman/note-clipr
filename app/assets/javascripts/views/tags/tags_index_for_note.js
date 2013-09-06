NoteClipr.Views.TagsIndexForNote = Backbone.View.extend({
  initialize: function (options) {
    var renderCallback = this.render.bind(this);
    this.listenTo(this.collection, "add", renderCallback);

    this.parentNote = options.parentNote;
  },

  events: {
    "click ul#note-tag-list li": "removeTag"
  },

  template: JST['tags/index_for_note'],

  render: function () {
    this.$el.html(this.template({
      tags: this.collection
    }));

    return this;
  },

  removeTag: function (event) {
    var target = $(event.currentTarget);
    var tag_id = target.data('id');
    $.ajax({
      url: "/tagging",
      type: "DELETE",
      data: { tag_id: tag_id,
              note_id: this.parentNote.id },
      success: function () {
        target.remove();
      }
    });
  }

});
