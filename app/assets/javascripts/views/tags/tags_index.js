NoteClipr.Views.TagsIndex = Backbone.View.extend({

  events: {
    "click ul#tag-list li": "toggleTagActive"
  },

  template: JST['tags/index'],

  render: function () {
    this.$el.html(this.template({
      collection: this.collection
    }));

    return this;
  },

  toggleTagActive: function (event) {
    $el = $(event.currentTarget);
    var tagId = $el.data('id');
    var tag = this.collection.get(tagId);
    var tagActive = tag.get("active");

    tag.set("active", !tagActive);
    $el.toggleClass("active");
  }

});
