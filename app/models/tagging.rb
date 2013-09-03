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

  belongs_to :note
  belongs_to :tag
  has_one :user, :through => :note
end