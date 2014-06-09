class CategorySerializer < ActiveModel::Serializer
  attributes :name, :id, :articles
  
  def articles
    object.articles
  end
end

