NoteClipr.Collections.Notes = Backbone.Collection.extend({

  model: NoteClipr.Models.Note,

  url: function () {
    return "/notes";
  },

  comparator: function (model) {
    return -Date.parse(model.get("updated_at"));
  },

  displayFilter: function (options) {
    return this.notebookFilter(options.currentNotebookId)
      .tagFilter(options.activeTags)
      .searchFilter();
  },

  notebookFilter: function (currentNotebookId) {
    if (!currentNotebookId) {
      return this;
    }

    var filtered = this.filter(function (note) {
      return note.get("notebook_id") == currentNotebookId;
    });

    return new NoteClipr.Collections.Notes(filtered);
  },

  searchFilter: function () {
    var filtered = this.filter(function (note) {
      return note.get("matchesSearch");
    });

    return new NoteClipr.Collections.Notes(filtered);
  },

  tagFilter: function (tags) {
    if (!tags || tags.length === 0) {
      return this;
    }

    var filtered =  this.filter(function (note) {
      return tags.all(function(tag) {
        return note.get("tags") && note.get("tags").some(function (noteTag) {
          return noteTag.id === tag.id;
        });
      });
    });

    return new NoteClipr.Collections.Notes(filtered);
  }

});