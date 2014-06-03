class Category < ActiveRecord::Base
	validates :name, presence: true, uniqueness: true
  has_many :article_categories, inverse_of: :category
  has_many :articles, through: :article_categories
end
