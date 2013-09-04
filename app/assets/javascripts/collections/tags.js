NoteClipr.Collections.Tags = Backbone.Collection.extend({

  model: NoteClipr.Models.Tag,

  activeOnly: function () {
    var filtered = this.where({active: true});

    return new NoteClipr.Collections.Tags(filtered);
  }

});
