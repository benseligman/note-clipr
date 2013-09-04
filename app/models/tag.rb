# == Schema Information
#
# Table name: tags
#
#  id         :integer          not null, primary key
#  user_id    :integer          not null
#  body       :string(255)      not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Tag < ActiveRecord::Base
  attr_accessible :body, :user_id
  validates :body, :user_id, :user, :presence => true
  validates :body, :uniqueness => { :scope => :user_id },
                   :format => { :with => /^[\S]+$/}

  before_validation { self.body.downcase! }

  belongs_to :user
  has_many :taggings, :dependent => :destroy
  has_many :notes, :through => :taggings
end
