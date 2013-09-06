class UsersController < ApplicationController
  before_filter :require_no_logged_in_user!, :only => [:new, :create]


  def new
    @user = User.new
    render :new
  end

  def create
    @user = User.new(params[:user])

    if @user.save
      log_in(@user)
      redirect_to root_url
    else
      flash.now["errors"] = @user.errors.full_messages
      render :new
    end
  end
end
