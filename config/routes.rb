Rails.application.routes.draw do
root to: "pages#angular"

	namespace :api do
		namespace :v1 do
			resources :articles
			resources :categories, only: [:index]
		end
	end
end
