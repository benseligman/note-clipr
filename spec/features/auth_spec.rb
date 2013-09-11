require 'spec_helper'

feature "Sign up" do
  before :each do
    visit "/user/new"
  end

  it "has a user sign up page" do
    page.should have_content "Sign Up!"
  end

  it "takes a username and password" do
    page.should have_content "Username"
    page.should have_content "Password"
    page.should have_content "Password Confirmation"
  end

  it "validates the presence of the user's username and password" do
    fill_in "Username", with: 'demo_user'
    click_button 'Sign Up!'
    page.should have_content 'Sign Up'
  end

  it "validates that the password is at least 6 characters long" do
    fill_in "Username", with: 'demo_user'
    fill_in "Password", with: 'short'
    click_button 'Sign Up!'
    page.should have_content 'Sign Up'
  end

  it "logs the user in and redirects them to posts index on success" do
    sign_up_as_demo_user
    page.should have_content 'demo_user'
  end
end

feature "Sign out" do
  it "has a sign out button" do
    sign_up_as_demo_user
    page.should have_link 'Sign out'
  end

  it "logs a user out on click" do
    sign_up_as_demo_user
    sign_out

    visit '/'
    # redirect to login page
    page.should have_selector('h1', :text => 'Sign In!')
  end
end

feature "Sign in" do
  it "has a sign in page" do
    visit "/session/new"
    page.should have_content "Sign In"
  end

  it "takes a username and password" do
    visit "/session/new"
    page.should have_content "Username"
    page.should have_content "Password"
  end

  it "returns to sign in on failure" do
    visit "/session/new"
    fill_in "Username", with: 'demo_user'
    fill_in "Password", with: 'hello'
    click_button "Sign In!"

    # return to sign-in page
    page.should have_content "Sign In!"
  end

  it "takes a user to posts index on success" do
    sign_up_as_demo_user
    sign_out

    # Sign in as newly created user
    visit "/session/new"
    fill_in "Username", with: 'demo_user'
    fill_in "Password", with: 'abcdef'
    click_button "Sign In!"
    page.should have_content "demo_user"
  end
end
