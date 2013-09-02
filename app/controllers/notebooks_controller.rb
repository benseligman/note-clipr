class NotebooksController < ApplicationController
  before_filter :require_logged_in_user!
  respond_to :json

  def index
    @notebooks = self.current_user.notebooks
    render :index
  end

  def create
    @notebook = Notebook.new(params[:notebook]);
    @notebook.user_id = current_user.id

    if @notebook.save
      render :json => @notebook
    else
      render :json => @notebook, :status => 422
    end
  end
end
