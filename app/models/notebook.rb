# == Schema Information
#
# Table name: notebooks
#
#  id         :integer          not null, primary key
#  user_id    :integer          not null
#  name       :string(255)      not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Notebook < ActiveRecord::Base
  attr_accessible :name, :user_id
  validates :name, :presence => true, :uniqueness => {:scope => :user_id}
  validates :user_id, :presence => true
  validates :user, :presence => true

  belongs_to :user
  has_many :notes, :dependent => :destroy
end
