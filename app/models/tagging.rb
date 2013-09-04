# == Schema Information
#
# Table name: taggings
#
#  id         :integer          not null, primary key
#  note_id    :integer          not null
#  tag_id     :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Tagging < ActiveRecord::Base
  attr_accessible :note_id, :tag_id
  validates :note_id, :tag_id, :presence => true
  validates :tag_id, :uniqueness => { :scope => :note_id }
  validate :note_and_tag_share_user

  belongs_to :note
  belongs_to :tag
  has_one :user, :through => :note

  private

  def note_and_tag_share_user
    unless self.note.notebook.user_id == self.tag.user_id
      self.errors[:tag] << "must be owned by same user as tagged note."
    end
  end
end