NoteClipr.Views.NotesSearch = Backbone.View.extend({
  initialize: function () {
  },

  events: {
    "keyup": "applySearch"
  },

  template: JST['notes/search'],

  render: function () {
    this.$el.html(this.template());
    // this.addTypeahead();
    return this;
  },

  addTypeahead: function () {
    var noteTitles = this.collection.map(function (note) {
      return note.get("title");
    });

    noteTitles = _.compact(noteTitles);

    this.$el.find(".search-query").typeahead({source: noteTitles});
  },

  applySearch: function () {
    var searchTerms = $("input.search-query").val();
    var that = this;
    if (searchTerms) {
      this.collection.each(function (note) {
        note.set("matchesSearch", that._checkMatch(note, searchTerms));
      });
    } else {
      this.collection.each(function (note) {
        note.set("matchesSearch", true );
      });
    }
  },

  _checkMatch: function (note, searchTerms) {
    var re = new RegExp(".*" + searchTerms + ".*", "i");
    var title = note.get("title") || "";
    return !!title.match(searchTerms);
  }

});
