module NotesHelper
  def notes_so_far
    Rails.cache.fetch("lotofnotes", :expires_in => 10.minutes) do
      notes_query
    end
  end

  def notes_query
    Note.count
  end
end
