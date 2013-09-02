class NotebooksController < ApplicationController
  before_filter :require_logged_in_user!

  def index
    @notebooks = self.current_user.notebooks
    render :index
  end
end
