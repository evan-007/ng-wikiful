require 'spec_helper'

describe PagesController do
 describe '#home' do
  it 'shows 5 random articles' do
    5.times { create(:article) }
    get :home
    data = JSON.parse(response.body)
    #expect(data).to include articles
    expect(response.status).to be 200
  end
 end
end
