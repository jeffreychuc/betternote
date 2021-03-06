Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'static_pages#root'
  namespace :api, defaults: {format: :json} do
    resource :session, only: [:create, :destroy]
    resources :users, only: [:create]
    resources :notes, only: [:create, :update, :destroy, :index, :show]
    resources :notebooks, only: [:create, :update, :destroy, :index, :show]
    resources :tags, only: [:create, :update, :destroy, :index, :show]
    resources :taggings, only: [:create, :destroy]
  end
end
