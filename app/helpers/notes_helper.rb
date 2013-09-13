module NotesHelper
  def notes_so_far
    num_notes = REDIS.get("num_notes")

    if !num_notes
      num_notes = notes_query
      REDIS.set("num_notes", num_notes)
      REDIS.expire("num_notes", 10.minutes)
    end

    num_notes
  end

  def notes_query
    Note.count
  end
end
