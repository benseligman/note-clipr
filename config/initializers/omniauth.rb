Rails.application.config.middleware.use OmniAuth::Builder do
  provider :google_oauth2, ENV["GOOGLE_ACCESS_KEY"], ENV["GOOGLE_SECRET_ACCESS_KEY"], {
    :access_type => "offline",
    :prompt => "consent"
  }
end