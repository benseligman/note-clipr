module NoteSharesHelper
  def viewer_is_author(note)
    current_user && current_user == note.owning_user
  end
end
