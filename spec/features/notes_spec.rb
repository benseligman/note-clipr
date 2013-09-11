require 'spec_helper'

feature "Creating a note", :js => true do

  context "when logged in" do
    before :each do
      sign_up_as_demo_user
      create_notebook
      find(".notebook-item").click
      click_button("Add a Note!")
    end

    it "has a new note page with title, body, and tags" do
      page.should have_selector("form#note-edit")
    end

    it "adds a note to the notebook's notes index" do
      within("#note-list") { page.should have_text("Untitled") }
    end

    it "adds a note to the global note collection" do
      find(".notebook-item-global").click
      within("#note-list") { page.should have_text("Untitled") }
    end

    it "shows updated notes on save" do
      fill_in "Title", with: "a title"
      click_button("save_note")
      within("#note-list") { page.should have_text("a title") }
    end

    it "persists saved changes" do
      fill_in "Title", with: "a title"
      click_button("save_note")
      visit(current_path)
      within("#note-list") { page.should have_text("a title") }
    end

    it "saves notes with tags" do
      fill_in "Add Tags (separated by spaces)", :with => "some new tags"
      click_button("save_note")

      within("#note-list") { find(".list-item").click }

      within("#note-tag-list") do
        page.should have_text("some")
        page.should have_text("new")
        page.should have_text("tags")
      end
    end

    it "adds tags to tag list" do
      fill_in "Add Tags (separated by spaces)", :with => "some new tags"
      click_button("save_note")

      within("#tag-list") do
        page.should have_text("some")
        page.should have_text("new")
        page.should have_text("tags")
      end
    end

    it "persists saved tags" do
      fill_in "Add Tags (separated by spaces)", :with => "some new tags"
      click_button("save_note")

      visit(current_path)
      within("#tag-list") do
        page.should have_text("some")
        page.should have_text("new")
        page.should have_text("tags")
      end
    end

  end
end