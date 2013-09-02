NoteClipr::Application.routes.draw do
  root :to => "root#root"
  resources :users, :only => [:new, :create]
  resource :session, :only => [:new, :create, :destroy]

  resources :notebooks, :only => [:index, :create] do
    resources :notes, :only => [:index, :create]
  end

end