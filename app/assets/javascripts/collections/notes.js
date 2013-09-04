NoteClipr.Collections.Notes = Backbone.Collection.extend({

  model: NoteClipr.Models.Note,

  url: function () {
    return "/notes";
  },

  comparator: function (model) {
    return -Date.parse(model.get("updated_at"));
  },

  tagFilter: function (tags) {
    if (tags.length === 0) {
      return this;
    }

    var filtered =  this.filter(function (note) {
      return tags.all(function(tag) {
        return note.get("tags") && note.get("tags").some(function (noteTag) {
          return noteTag.id === tag.id;
        });
      });
    });

    return new NoteClipr.Collections.Notes(filtered);
  }

});