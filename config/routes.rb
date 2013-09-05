NoteClipr::Application.routes.draw do
  mount Rich::Engine => '/rich', :as => 'rich'

  root :to => "root#root"
  resources :users, :only => [:new, :create]
  resource :session, :only => [:new, :create, :destroy]

  resources :notebooks, :only => [:create]
  resources :notes, :only => [:create, :update, :new]

end