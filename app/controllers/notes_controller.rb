class NotesController < ApplicationController
  before_filter :authorize_for_note, :only => [:show]
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

  def show
    @note = Note.find(params[:id])
  end

  private

  def authorize_for_note
    note = Note.find(params[:id])
    unless note.shared? || note.owning_user == current_user
      flash["warning"] = "You aren't authorized to see that note."
      redirect_to (logged_in? ?  :root : :new_session)
    end
  end
end
