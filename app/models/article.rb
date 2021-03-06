class Article < ActiveRecord::Base
	validates :title, presence: true, uniqueness: true
	validates :body, presence: true
  has_many :article_categories, inverse_of: :article
	has_many :categories, through: :article_categories, inverse_of: :articles
	belongs_to :user
end
