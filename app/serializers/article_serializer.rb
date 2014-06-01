class ArticleSerializer < ActiveModel::Serializer
	attributes :title, :body, :id
	has_many :categories, serializer: CategorySerializer
end