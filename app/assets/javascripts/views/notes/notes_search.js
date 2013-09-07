NoteClipr.Views.NotesSearch = Backbone.View.extend({

  events: {
    "submit": "preventSubmission",
    "keyup": "applySearch"
  },

  template: JST['notes/search'],

  render: function () {
    this.$el.html(this.template());
    this.$el.addClass("form-group");
    this.addTypeahead();
    return this;
  },

  addTypeahead: function () {
    var noteTitles = this.collection.map(function (note) {
      return note.get("title");
    });

    noteTitles = _.compact(noteTitles);

    var that = this;

    this.$el.find("input#search-text").typeahead({
      local: noteTitles
    });
  },

  applySearch: function () {
    var targetEl = this.$el.find("input#search-text").get(0);
    var searchTerms = $(targetEl).val();

    var that = this;
    if (searchTerms.replace(/ /g, "")) {
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
    return !!title.match(re);
  },

  preventSubmission: function (event) {
    event.preventDefault();
  }
});
