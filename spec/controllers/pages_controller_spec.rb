require 'spec_helper'

describe PagesController do
 describe '#home' do
  it 'shows 5 random articles' do
    get '/home'
    expect(response).to be '[]'
  end
 end
end
