Rails.application.routes.draw do
root to: "pages#angular"

	namespace :api do
		resources :articles		
	end
end
