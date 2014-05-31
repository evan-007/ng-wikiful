module Api
	class ArticlesController < ApplicationController
		def index
			@articles = Article.all
			render json: @articles
		end

		def show
			@article = Article.find(params[:id])
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

		private
		  def article_params
		  	params.require(:article).permit(:title, :body)
		  end
	end
end