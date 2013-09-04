collection @notebooks
attributes :id, :name

child(:notes) do
  extends("notes/index")
end