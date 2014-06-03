require 'spec_helper'

describe ArticleCategory do
	it { should validate_presence_of :article }
	it { should validate_presence_of :category }
end
