require 'spec_helper'

describe Api::V1::ArticlesController do
  before do
    @user = create(:user)
    sign_in @user
  end
	describe 'GET #index' do
		before do
			@article = create(:article_with_categories)
			@article3 = create(:article)
			@article2 = create(:article)
		end

		it "returns an array of all articles" do
			get :index
			expect(assigns(:articles)).to eq [@article, @article3, @article2]
			expect(response.status).to eq 200
		end

		it 'includes categories in the response' do
			get :index
			data = JSON.parse(response.body)
			data[0]['categories'].should_not be_blank
		end
	end

	describe 'GET #show' do
		it "assigns the requested article to @article" do
			@article = create(:article)
			get :show, id: @article
			expect(assigns(:article)).to eq @article
			expect(response.status).to eq 200
		end

		it 'includes article categories' do
			@article = create(:article_with_categories)
			get :show, id: @article
			data = JSON.parse(response.body)
			data['categories'].should_not be_blank
		end
	end

	describe 'POST #create' do
		it 'saves the article in the database' do
			expect {post :create, article: attributes_for(:article)}
			.to change(Article, :count).by(1)
		end
    
    it 'save the article under the current user' do
      expect {post :create, article: attributes_for(:article)}
      .to change(@user.articles, :count).by(1)
    end

		it 'returns 422 when unvalid' do
			post :create, { article: {title:nil} }
			expect(response.status).to eq 422
		end
	end

	describe 'DELETE #destroy' do
		it 'deletes the article from the database' do
			@article = create(:article)
			expect {delete :destroy, id: @article}
			.to change(Article, :count).by(-1)
			expect(response.status).to eq 204
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