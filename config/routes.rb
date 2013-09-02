NoteClipr::Application.routes.draw do
  resources :users, :only => [:new, :create]
  resource :session, :only => [:new, :create, :destroy]
  resources :notebooks, :only => [:index, :create]
  root :to => "root#root"
end