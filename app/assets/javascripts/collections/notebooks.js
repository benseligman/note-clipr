NoteClipr.Collections.Notebooks = Backbone.Collection.extend({

  model: NoteClipr.Models.Notebook,

  url: "/notebooks",

  comparator: function  (model) {
    return -model.id;
  }

});
