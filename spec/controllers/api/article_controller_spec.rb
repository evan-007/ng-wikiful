require 'spec_helper'

describe Api::ArticlesController do
	describe 'GET #index' do
		it "returns an array of all articles" do
			@article = create(:article)
			@article3 = create(:article)
			@article2 = create(:article)
			get :index
			expect(assigns(:articles)).to eq [@article, @article3, @article2]
		end
	end

	describe 'GET #show' do
		it "assigns the requested article to @article" do
			@article = create(:article)
			get :show, id: @article
			expect(assigns(:article)).to eq @article
		end
	end
end