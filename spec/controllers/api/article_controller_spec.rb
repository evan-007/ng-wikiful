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

	describe 'POST #create' do
		it 'saves the article in the database' do
			expect {post :create, article: attributes_for(:article)}
			.to change(Article, :count).by(1)
		end
	end

	describe 'DELETE #destroy' do
		it 'deletes the article from the database' do
			@article = create(:article)
			expect {delete :destroy, id: @article}
			.to change(Article, :count).by(-1)
		end
	end

	describe 'PUT #update' do
		it 'updates the article' do
			@article = create(:article)
			put :update, id: @article.id, article: attributes_for(
				:article, title: 'some new title')
			@article.reload
			expect(@article.title).to eq 'some new title'
		end
	end
end