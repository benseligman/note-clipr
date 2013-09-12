NoteClipr.Models.Notebook = Backbone.Model.extend({
  notes: function () {
    return NoteClipr.Store.notes.notebookFilter(this.id);
  }
});
