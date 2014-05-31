class ArticleSerializer < ActiveModel::Serializer
	attributes :title, :body, :id, :updated_at
end