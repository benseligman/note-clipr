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
  has_many :taggings
  has_many :tags, :through => :taggings

  def save_with_tags!(tags)
    new_tags = new_tags.nil? ? [] : tags.select { |tag| tag.id.nil? }
    new_tag_bodies = new_tags.map(&:downcase)

    Note.transaction do
      self.save!

      note_owner = self.owning_user

      new_tag_bodies.each do |new_tag_body|
        next if new_tag_body.blank? ||
                self.tags.pluck("body").include?(new_tag_body)

        tag = Tag.where(:body => new_tag_body, :user_id => note_owner.id).first_or_create
        Tagging.create!(:note_id => self.id, :tag_id => tag.id)
      end
    end
  end
end


