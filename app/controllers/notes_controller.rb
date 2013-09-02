class NotesController < ApplicationController
  def update
    @note = Note.find(params[:id]);
    if @note.update_attributes(params[:note])
      render :json => @note
    else
      render :json => @note.errors.full_messages, :status => 422
    end
  end

  def create
    @note = Note.new(params[:note])
    @note.notebook_id = params[:notebook_id]
    if @note.save
      render :json => @note
    else
      render :json => @note.errors.full_messages, :status => 422
      p @note.errors.full_messages
      p params
    end
  end
end
