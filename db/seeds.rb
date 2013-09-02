ActiveRecord::Base.transaction do
  User.create!([
    { username: "pearl", email: "dog@dog.dog", password: "dogdog", password_confirmation: "dogdog" },
    { username: "bob", email: "gecko@gecko.gecko", password: "geckos", password_confirmation: "geckos" },
    { username: "demo", email: "demo@demo.com", password: "demodemo", password_confirmation: "demodemo" }
  ])

  Notebook.create!([
    { user_id: 1, name: "first notebook" },
    { user_id: 1, name: "squirrels" },
    { user_id: 1, name: "important foods" },
    { user_id: 3, name: "first notebook" },
    { user_id: 2, name: "another notebook" },
    { user_id: 2, name: "my last notebook for today" }
  ])

  Note.create!([
    { notebook_id: 1, author: "william james"},
    { notebook_id: 1, title: "an important note"},
    { notebook_id: 2, title: "colors of squirrel"},
    { notebook_id: 2, body: "squirrelsquirrelsquirrel"},
    { notebook_id: 4, body: "trying out the app"}
  ])
end