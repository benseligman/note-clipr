class SessionsController < ApplicationController
  before_filter :require_no_logged_in_user!, :only => [:create, :new]
  before_filter :require_logged_in_user!, :only => [:destroy]

  def new
    render :new
  end

  def create
    @user = User.find_by_credentials(params[:credentials])

    if @user
      log_in(@user)
      redirect_to root_url
    else
      flash.now["alert"] = "Invalid username/password combination."
      render :new
    end
  end

  def destroy
    log_out
    redirect_to :root
  end
end
