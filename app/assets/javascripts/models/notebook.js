NoteClipr.Models.Notebook = Backbone.Model.extend({
  parse: function (data) {
    var notes = new NoteClipr.Collections.Notes(data.notes, {
      notebookId: data.id,
      parse: true
    });

    notes.each(function(note) { NoteClipr.Store.notes.add(note); });

    data.notes = notes;
    return data;
  }
});
