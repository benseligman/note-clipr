NoteClipr.Models.Note = Backbone.Model.extend({
  parse: function (data) {
    var tags = new NoteClipr.Collections.Tags(data.tags);

    tags.each(function (tag) {
     if (!NoteClipr.Store.tags.contains(tag)) {
      NoteClipr.Store.tags.add(tag.toJSON());
     }
    });

    data.tags = tags;
    return data;
  }
});
