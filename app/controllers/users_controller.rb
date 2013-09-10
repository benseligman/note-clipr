class UsersController < ApplicationController
  before_filter :require_no_logged_in_user!, :only => [:new, :create]
  before_filter :require_logged_in_user!, :only => [:edit, :update]


  def new
    @user = User.new
    render :new
  end

  def create
    @user = User.new(params[:user])
    @user.create_method = :oauth

    if @user.save
      log_in(@user)
      redirect_to root_url
    else
      flash.now["danger"] = @user.errors.full_messages.join(" <br> ")
      render :new
    end
  end

  def edit
  end

  def update
    if self.current_user.encrypted_password &&
      (!self.current_user.encrypted_password == params[:old_password])
      flash.now["danger"] = "Password incorrect."
      render :edit
      return
    end

    if self.current_user.update_attributes(params[:user])
      redirect_to :root
    else
      flash.now["warning"] = self.current_user.errors.full_messages.join(" <br> ")
      render :edit
    end
  end
end
