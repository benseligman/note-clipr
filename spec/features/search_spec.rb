require 'spec_helper'
require 'ejs'

feature "Searching for notes", :js => true do
  before :each do
    sign_up_as_demo_user
    create_notebook
    find(".notebook-item").click

    click_button "Add a Note!"
    fill_in "Title", with: "a title"
    click_button "Save Note"

    click_button "Add a Note!"
    fill_in "Title", with: "another title for a note"
    click_button "Save Note"

    click_button "Add a Note!"
    fill_in "Title", with: "yet another title"
    click_button "save_note"
  end

  context "when no search is active" do
    it "matches all notes if the box is empty" do
      fill_in "search-text", with: ""
      within("#note-list") { page.should have_text("a title") }
      within("#note-list") { page.should have_text("another title for a note") }
      within("#note-list") { page.should have_text("yet another title") }
    end

    it "matches all notes if the box is all spaces" do
      fill_in "search-text", with: "   "
      within("#note-list") { page.should have_text("a title") }
      within("#note-list") { page.should have_text("another title for a note") }
      within("#note-list") { page.should have_text("yet another title") }
    end
  end

  context "when a search is entered" do
    before do
      fill_in "search-text", with: "another title"
    end

    it "returns matches that contain the search field"  do
      within("#note-list") { page.should have_text("another title for a note") }
      within("#note-list") { page.should have_text("yet another title") }
    end

    it "does not return matches that contain the search field"  do
      within("#note-list") { page.should_not have_text("a title") }
    end
  end
end
