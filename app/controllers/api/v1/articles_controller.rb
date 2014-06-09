module Api
	module V1
		class ArticlesController < ApplicationController
			def index
				@articles = Article.all.includes(:categories)
				render json: @articles, status: 200
			end

			def show
				@article = Article.includes(:categories).find(params[:id])
				render json: @article, status: 200
			end

			def create
				@article = current_user.articles.new(article_params)
				if @article.save
					render nothing: true, status: 204
				else
					render json: @article.errors, status: 422
				end
			end

			def destroy
        @article = current_user.articles.find(params[:id])
				if @article.destroy
					render json: nil, status: 204
				end
			end

			def update
        @article = current_user.articles.find(params[:id])
				if @article.update_attributes(article_params)
					render json: @article, status: 200
				else
					render json: @article, status: 500
				end
			end

			private
			  def article_params
			  	params.require(:article).permit(:title, :body, :id,
			  	 category_ids: [])
			  end
		end
	end
end