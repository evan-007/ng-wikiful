module Api
	module V1
		class CategoriesController < ApplicationController
			def index
				@categories = Category.all
				render json: @categories, status: 200
			end
      
      def show
        @category = Category.includes(:articles).find(params[:id])
        render json: @category, status: 200
      end
		end
	end
end