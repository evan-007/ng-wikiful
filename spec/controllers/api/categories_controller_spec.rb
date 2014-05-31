require 'spec_helper'

describe Api::CategoriesController do
	describe 'GET #index' do
		it 'assigns all categories to an array' do
			@cat1 = create(:category)
			@cat2 = create(:category)
			@cat3 = create(:category)
			get :index
			expect(assigns(:categories)).to eq [@cat1, @cat2, @cat3]
		end

		it 'renders json' do
			@cat = create(:category)
			get :index
			data = JSON.parse(response.body)
			expect(data[0]['name']).to eq @cat.name
		end
	end
end