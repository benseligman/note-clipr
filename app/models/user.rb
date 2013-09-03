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
  attr_accessible :email,
                  :password_digest,
                  :session_token,
                  :username,
                  :password,
                  :password_confirmation
  attr_accessor :password, :password_confirmation

  validates :username, :presence => true,
                       :uniqueness => true,
                       :format => { :with => /^[a-z\d]+$/, :message => "must be all alphanumeric." }

  validates :email,    :presence => :true,
                       :uniqueness => :true,
                       :format => { :with => /@/ }

  validates :password, :presence => { :on => :create },
                       :length => { :minimum => 6, :allow_blank => true }
  validate :password,  :matches_confirmation


  before_validation :set_token, :on => :create
  before_validation { self.email.downcase!; self.username.downcase! }
  before_save { encrypt_password unless self.password.nil? }

  has_many :notebooks
  has_many :notes, :through => :notebooks

  has_many :tags

  include BCrypt

  def self.find_by_credentials(credentials)
    user = User.find_by_username(credentials[:login_name])
    user ||= User.find_by_email(credentials[:login_name].downcase)

    user if user && user.encrypted_password == credentials[:password]
  end

  def as_json(options = {})
    super(options.merge( { :only => [:username, :id] } ))
  end

  def encrypted_password
    @encrypted_password ||= Password.new(self.password_digest)
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

  def matches_confirmation
    unless self.password.blank? || self.password == self.password_confirmation
      errors[:password] << "must match confirmation."
    end
  end

end
