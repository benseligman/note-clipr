class ApplicationController < ActionController::Base
  protect_from_forgery

  include SessionsHelper

  def log_in(user)
    user.set_token!
    session[:session_token] = user.session_token
    nil
  end

  def log_out
    current_user.set_token!
    session[:session_token] = nil
  end

  def require_logged_in_user!
    redirect_to new_user_url unless logged_in?
  end

  def require_no_logged_in_user!
    redirect_to root_url if logged_in?
  end
end
