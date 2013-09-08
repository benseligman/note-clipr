class NoteSharesController < ApplicationController
  def create
    @note_share = NoteShare.new(params[:note_share])

  if @note_share.save
      render :json => @note_share
    else
      render :json => @note_share, :status => 422
    end
  end

  def destroy
    @note_share = NoteShare.find_by_note_id(params[:note_share][:note_id])
    if @note_share.destroy
      render :json => @note_share
    else
      render :json => @note_share, :status => 422
    end
  end
end
