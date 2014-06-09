class CategorySerializer < ActiveModel::Serializer
  attributes :name, :id, :articles, :article_count
  
  def articles
    object.articles
  end
  
  def article_count
    object.articles.count
  end
end

