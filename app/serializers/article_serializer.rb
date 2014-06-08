class ArticleSerializer < ActiveModel::Serializer
	attributes :title, :body, :id, :user_id, :written_by
	has_many :categories, serializer: CategorySerializer

	def written_by
		if object.user_id.present?
			User.find(object.user_id).email
		end
	end
end