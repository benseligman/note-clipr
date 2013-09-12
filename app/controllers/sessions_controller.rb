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
      flash.now["warning"] = "Invalid username/password combination. Note: if you signed up with google and have not set a password, you must log in using google."
      render :new
    end
  end

  def destroy
    log_out
    redirect_to :root
  end

  def google
    auth_info = request.env["omniauth.auth"]
    @user = User.find_or_create_by_auth(auth_info)
    log_in(@user)
    redirect_to root_url
  end
end