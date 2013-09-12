NoteClipr.Collections.Notebooks = Backbone.Collection.extend({

  model: NoteClipr.Models.Notebook,

  url: "/notebooks",

  comparator: function  (notebook) {
    return -notebook.notes().length;
  }
});
