class TaggingsController < ApplicationController
  def destroy
    @tag = Tagging.find_by_note_id_and_tag_id(params[:note_id], params[:tag_id])
    @tag.destroy
    render :json => @tag
  end
end
