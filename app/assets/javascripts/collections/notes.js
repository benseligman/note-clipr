NoteClipr.Collections.Notes = Backbone.Collection.extend({
  initialize: function (notebookId) {
    this.notebookId = notebookId;
  },

  model: NoteClipr.Models.Note,

  url: function () {
    return "/notebooks/" + notebookId + "/notes";
  }

});
