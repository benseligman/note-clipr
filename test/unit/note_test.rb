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

require 'test_helper'

class NoteTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end