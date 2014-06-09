class PagesController < ApplicationController
	def angular
	end
  
  def home
    @articles = Article.all.shuffle.take(5)
    render json: @articles, status: 200
  end
end