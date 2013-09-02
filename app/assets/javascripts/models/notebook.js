NoteClipr.Models.Notebook = Backbone.Model.extend({
  parse: function (data) {
    var notes = new NoteClipr.Collections.Notes(data.notes);
    data.notes = notes;
    return data;
  }
});
