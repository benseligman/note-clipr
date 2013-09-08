NoteClipr.Views.TagsIndex = Backbone.View.extend({
  initialize: function () {
    var renderCallback = this.render.bind(this);
    this.listenTo(this.collection, "add", renderCallback);
  },

  events: {
    "click div#tag-list div": "toggleTagActive",
    "mouseenter div#tag-list div": "highlight",
    "mouseleave div#tag-list div": "removeHighlight"
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
  },

 highlight: function (event) {
    $(event.currentTarget).addClass("highlighted");
  },

  removeHighlight: function (event) {
    $(event.currentTarget).removeClass("highlighted");
  }

});
