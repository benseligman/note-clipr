noteClipr.factory('Tags', ['Notes', function (Notes) {
    tags = []
    Notes.success(function(notes) {
      for (i=0;i < notes.length; i++) {
        note = notes[i];

        for(j=0; j < note.tags.length; j++) {
          tag = note.tags[j];
          if (tags.indexOf(tag.body) === -1) {
            tags.push(tag.body);
          }
        }
      }
    });

    return tags;
  }
]);
