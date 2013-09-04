NoteClipr.Collections.Notes = Backbone.Collection.extend({
  initialize: function (models, options) {
    this.notebookId = options.notebookId;
  },

  model: NoteClipr.Models.Note,

  url: function () {
    return "/notebooks/" + this.notebookId + "/notes";
  },

  comparator: function (model) {
    return -Date.parse(model.get("updated_at"));
  }

});