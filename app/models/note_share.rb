class NoteShare < ActiveRecord::Base
  attr_accessible :note_id
  belongs_to :note
  validates :note_id, :note, :presence => true
  validates :note_id, :uniqueness => true
end