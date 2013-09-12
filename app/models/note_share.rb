# == Schema Information
#
# Table name: note_shares
#
#  id         :integer          not null, primary key
#  note_id    :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class NoteShare < ActiveRecord::Base
  attr_accessible :note_id
  belongs_to :note
  validates :note_id, :note, :presence => true
  validates :note_id, :uniqueness => true
end
