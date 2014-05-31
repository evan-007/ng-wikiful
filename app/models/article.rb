class Article < ActiveRecord::Base
	validates :title, presence: true, uniqueness: true
	validates :body, presence: true
	has_many :article_categories
	has_many :categories, through: :article_categories
end
