class SessionsController < ApplicationController
  def create
    @user = User.find_by_credentials(params[:credentials])

    if @user
      log_in(@user)
      render :json => @user
    else
      render :json => "Invalid", :status => 422
    end
  end

  def destroy
    log_out
  end
end
