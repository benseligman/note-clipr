object @note
attributes :id, :body, :title, :notebook_id, :created_at, :updated_at

node(:shared) { |note| !!note.note_share }

child(:tags) do
  attributes :id, :body
end