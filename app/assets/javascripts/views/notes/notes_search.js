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
    var searchField = this.$el.find("input#search-text").get(0);
    var searchTerms = $(searchField).val();

    this.collection.each(function (note) {
      note.setSearchMatching(searchTerms);
    });
  },

  preventSubmission: function (event) {
    event.preventDefault();
  }
});
