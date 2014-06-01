module Api
	module V1
		class ArticlesController < ApplicationController
			def index
				@articles = Article.all.includes(:categories)
				render json: @articles
			end

			def show
				@article = Article.includes(:categories).find(params[:id])
				render json: @article
			end

			def create
				@article = Article.new(article_params)
				if @article.save
					render json: @article
				else
				end
			end

			def destroy
				@article = Article.find(params[:id])
				if @article.destroy
					render json: nil, status: 200
				end
			end

			def update
				@article = Article.find(params[:id])
				if @article.update_attributes(article_params)
					render json: nil, status: 200
				end
			end

			private
			  def article_params
			  	params.require(:article).permit(:title, :body, :id,
			  	 categories_attributes: [:name, :id])
			  end
		end
	end
end