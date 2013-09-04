NoteClipr.Collections.Notes = Backbone.Collection.extend({

  model: NoteClipr.Models.Note,

  url: function () {
    return "/notes";
  },

  comparator: function (model) {
    return -Date.parse(model.get("updated_at"));
  }

});