class ArticleCategory < ActiveRecord::Base
  belongs_to :article
  belongs_to :category
  # validates :category_id, :article_id, presence: true
  accepts_nested_attributes_for :category
end
