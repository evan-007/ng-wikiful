class ArticleCategory < ActiveRecord::Base
  belongs_to :article, inverse_of: :article_categories
  belongs_to :category, inverse_of: :article_categories
  validates :category, :article, presence: true
  accepts_nested_attributes_for :category
end
