require 'spec_helper'

describe ArticleCategory do
	it { should validate_presence_of :article_id }
	it { should validate_presence_of :category_id }
end
