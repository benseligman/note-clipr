# == Schema Information
#
# Table name: notes
#
#  id          :integer          not null, primary key
#  notebook_id :integer          not null
#  title       :string(255)
#  location    :string(255)
#  url         :string(255)
#  author      :string(255)
#  body        :text
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Note < ActiveRecord::Base
  attr_accessible :author, :body, :location, :notebook_id, :title, :url
  validates :notebook_id, :presence => true


  belongs_to :notebook
  has_one :owning_user, :through => :notebook, :source => :user
end
