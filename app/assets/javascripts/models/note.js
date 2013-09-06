NoteClipr.Models.Note = Backbone.Model.extend({
  initialize: function () {
    this.set("matchesSearch", true);
  },

  parse: function (data) {
    var tags = new NoteClipr.Collections.Tags(data.tags);

    tags.each(function (tag) {
     if (!NoteClipr.Store.tags.contains(tag)) {
      NoteClipr.Store.tags.add(tag);
     }
    });

    data.tags = tags;
    return data;
  }
});
