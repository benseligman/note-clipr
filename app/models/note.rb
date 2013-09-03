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

  def self.save_with_tags!(params)
    note = self.updated_note_for_params(params)
    new_tag_bodies = params[:tags].nil? ? [] : params[:tags].map(&:downcase)

    Note.transaction do
      note.save!

      note_owner = note.owning_user
      owner_tags = note_owner.tags

      new_tag_bodies.each do |new_tag_body|
        next if new_tag_body.blank? ||
                note.tags.pluck("body").include?(new_tag_body)

        tag = Tag.where(:body => new_tag_body, :user_id => note_owner.id).first_or_create

        Tagging.create!(:note_id => note.id, :tag_id => tag.id)
      end
    end

  end

  def self.updated_note_for_params(params)
    if params[:id]
      note = Note.includes(:tags).find_by_id(params[:id])
      note.assign_attributes(params[:note])
    end

    note || Note.new(params[:note])
  end
end
