NoteClipr.Views.NotesSearch = Backbone.View.extend({
  initialize: function () {
    // applies search every half-second
    setInterval(this.applySearch.bind(this), 500);
  },

  template: JST['notes/search'],

  render: function () {
    this.$el.html(this.template());
    this.addTypeahead();
    return this;
  },

  addTypeahead: function () {
    var noteTitles = this.collection.map(function (note) {
      return note.get("title");
    });

    noteTitles = _.compact(noteTitles);

    var that = this;

    this.$el.find(".search-query").typeahead({
      source: noteTitles,
      //apply search when typeahead is sorted. Doesn't refresh when bar is empty.
      sorter: function (item) {
        that.applySearch();
        return item;
      }
    });
  },

  applySearch: function () {
    var searchTerms = $("input.search-query").val(); //fix

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
  }
});
