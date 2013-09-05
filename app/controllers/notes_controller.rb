class NotesController < ApplicationController
  def index
    @notes = Note.all
  end

  def update
    @note = Note.find_by_id(params[:id])
    @note.assign_attributes(params[:note])

    if @note.save_with_tags!(params[:tags])
      render :show
    else
      render :json => @note.errors.full_messages, :status => 422
    end
  end

  def create
    @note = Note.new(params[:note])

    if @note.save_with_tags!(params[:tags])
      render :show
    else
      render :json => @note.errors.full_messages, :status => 422
    end
  end
end
