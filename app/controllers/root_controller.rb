 class RootController < ApplicationController
  before_filter :require_logged_in_user!

  def root
    render :root
  end
end
