class SessionsController < ApplicationController
  def new
    render :new
  end

  def create
    @user = User.find_by_credentials(params[:credentials])

    if @user
      log_in(@user)
      render :json => "Welcome, user!"
    else
      flash.now["alert"] = "Invalid username/password combindation."
      render :new
    end
  end

  def destroy
    log_out
  end
end
