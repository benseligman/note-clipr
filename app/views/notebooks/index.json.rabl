collection @notebooks
attributes :id, :name

child(:notes) do
  attributes :id, :author, :body, :location, :title, :url
end