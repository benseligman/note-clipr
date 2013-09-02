NoteClipr.Models.Notebook = Backbone.Model.extend({
  parse: function (data) {
    var notes = new NoteClipr.Collections.Notes(data.notes, {
      notebookId: data.id
    });

    data.notes = notes;
    return data;
  }
});
