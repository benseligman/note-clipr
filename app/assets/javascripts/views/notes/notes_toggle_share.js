NoteClipr.Views.NotesToggleShare = Backbone.View.extend({
  events: {
    "click button#unshare-note":"unshare",
    "click button#share-note":"share"
  },

  template: JST['notes/toggle_share'],

  render: function () {
    this.$el.html(this.template({
      shared: this.model.get("shared")
    }));

    return this;
  },

  unshare: function (event) {
    this._switchNoteShare(event, "DELETE");
  },

  share: function (event) {
    this._switchNoteShare(event, "POST");
  },

  _switchNoteShare: function (event, type) {
    event.preventDefault();

    var that = this;
    $.ajax({
      url: "/note_share",
      type: type,
      data: { note_share: { note_id: this.model.id } },
      success: function () {
        that._toggleButtonVisibility();
      }
    });
  },


  _toggleButtonVisibility: function () {
    this.$el.find("button").toggleClass("hidden");
  }
});