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
    @user = User.find_by_email(auth_info.info.email)
    @user ||= User.create(:email => auth_info.info.email, :create_method => :oauth)
    log_in(@user)
    redirect_to root_url
  end
end