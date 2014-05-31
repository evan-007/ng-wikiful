class ArticleSerializer < ActiveModel::Serializer
	attributes :title, :body, :id, :updated_at
	has_many :categories, serializer: CategorySerializer
end