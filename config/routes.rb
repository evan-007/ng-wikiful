Rails.application.routes.draw do
  devise_for :users
  root to: "pages#angular"
  
  get '/home', to: 'pages#home'

	namespace :api do
		namespace :v1 do
			resources :articles
			resources :categories, only: [:index, :show]
		end
	end
end
