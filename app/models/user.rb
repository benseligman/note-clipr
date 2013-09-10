# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  username        :string(255)      not null
#  email           :string(255)      not null
#  password_digest :string(255)      not null
#  session_token   :string(255)      not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

require 'bcrypt'

class User < ActiveRecord::Base
  attr_accessible :create_method,
                  :email,
                  :password_digest,
                  :session_token,
                  :username,
                  :password,
                  :password_confirmation

  attr_accessor :password, :password_confirmation, :create_method

  validates :username, :presence => true,
                       :uniqueness => true,
                       :format => { :with => /^[^ ]+$/, :message => "can't have spaces." }
  validate :username,  :is_not_a_different_email

  validates :email,    :presence => :true,
                       :uniqueness => :true,
                       :format => { :with => /@/ }

  validates :password, :presence => { :on => :create, :unless => :creating_by_oauth },
                       :length => { :minimum => 6, :allow_blank => true }
  validate :password,  :matches_confirmation


  before_validation :set_token, :set_username, :normalize_user_info, :on => :create
  before_save { encrypt_password unless self.password.nil? }

  has_many :notebooks, :dependent => :destroy
  has_many :notes, :through => :notebooks
  has_many :tags

  include BCrypt

  def set_username
    self.username ||= self.email
  end

  def self.find_by_credentials(credentials)
    return nil unless credentials[:password].to_s.length > 5

    user = User.find_by_username(credentials[:login_name])
    user ||= User.find_by_email(credentials[:login_name].downcase)

    user if user && user.encrypted_password == credentials[:password]
  end

  def as_json(options = {})
    super(options.merge( { :only => [:username, :id] } ))
  end

  def encrypted_password
    if self.password_digest
      @encrypted_password ||= Password.new(self.password_digest)
    end
  end

  def encrypt_password
    return if password.blank?

    @encrypted_password = Password.create(self.password)
    self.password_digest = @encrypted_password
  end

  def set_token!
    self.set_token
    self.save!
    nil
  end

  def set_token
    self.session_token = SecureRandom.urlsafe_base64
  end

  private
  def creating_by_oauth
    self.create_method == :oauth
  end

  def matches_confirmation
    unless self.password.blank? || self.password == self.password_confirmation
      errors[:password] << "must match confirmation."
    end
  end

  def normalize_user_info
    self.email.downcase!
    self.username.downcase!
  end

  def is_not_a_different_email
    if self.username =~ /@/ && self.username != self.email
      errors[:username] << "cannot be an email address other than yours."
    end
  end

end
