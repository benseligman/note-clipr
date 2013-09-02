NoteClipr.Collections.Notes = Backbone.Collection.extend({
  initialize: function (objects, options) {
    this.notebookId = options.notebookId;
  },

  model: NoteClipr.Models.Note,

  url: function () {
    return "/notebooks/" + this.notebookId + "/notes";
  }

});
