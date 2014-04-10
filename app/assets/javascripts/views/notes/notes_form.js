NoteClipr.Views.NotesForm = Backbone.View.extend({
  events: {
    "submit form#note-edit": "saveNote",
    "click #share-buttons button": "toggleLink"
  },

  template: JST['notes/form'],

  remove: function () {
    this.tagList.remove();
    this.shareButtons.remove();
    Backbone.View.prototype.remove.call(this);
  },

  render: function () {
    this.tagList = new NoteClipr.Views.TagsIndexForNote({
      collection: this.model.get("tags"),
      parentNote: this.model
    });

    this.shareButtons = new NoteClipr.Views.NotesToggleShare({
      model: this.model
    });

    var renderedTemplate = this.template({
      note: this.model
    });

    this.$el.html(renderedTemplate);
    this.$el.find("#note-tag-list").html(this.tagList.render().$el);
    this.$el.find(".note-sharing").prepend(this.shareButtons.render().$el);

    this._createEditor();

    return this;
  },

  saveNote: function (event) {
    event.preventDefault();
    var noteData = $(event.currentTarget).serializeJSON();

    var that = this;
    this.model.save(noteData, {
      parse: true,
      success: function () {
        that.model.collection.sort();
        NoteClipr.Store.notes.add(that.model);
        that.model.get("tags").each(function (tag) {
          NoteClipr.Store.tags.add(tag);
        });

        that.remove();
        var newUrl = "#/notebooks/" + that.model.get("notebook_id") + "/notes";
        NoteClipr.Store.router.navigate(newUrl);
      }
    });
  },

  toggleLink: function () {
    this.$el.find("#public-link").toggleClass("hidden");
  },

  _createEditor: function () {
    CKEDITOR.replace(this.$el.find('#note_body').get(0), {"height":400,"stylesSet":[],"extraPlugins":"stylesheetparser,richfile,MediaEmbed","removePlugins":"scayt,menubutton,image,forms","contentsCss":"/assets/rich/editor.css","removeDialogTabs":"link:advanced;link:target","forcePasteAsPlainText":true,"format_tags":"h3;p;pre","toolbar":[["Bold","Italic","-","NumberedList","BulletedList","-","richImage","-","Link","Unlink"]],"language":"en","richBrowserUrl":"/rich/files/","uiColor":"#f4f4f4","allowed_styles":["thumb","rich_thumb","original"],"default_style":"thumb","insert_many":false,"allow_document_uploads":false,"allow_embeds":false,"placeholder_image":"data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==","preview_size":"100px","hidden_input":false, "font_defaultLabel":"Arial"});
    CKEDITOR.instances.note_body.setData(this.model.get("body"));
  }

});
