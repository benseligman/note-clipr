NoteClipr::Application.routes.draw do
  mount Rich::Engine => '/rich', :as => 'rich'

  root :to => "root#root"
  resources :users, :only => [:new, :create]
  resource :session, :only => [:new, :create, :destroy]

  resources :notebooks, :only => [:index, :create, :destroy]
  resources :notes, :only => [:show, :create, :update, :destroy]
  resource :tagging, :only => [:destroy]
  resource :note_share, :only => [:create, :destroy]
end