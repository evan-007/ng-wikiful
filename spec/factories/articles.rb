FactoryGirl.define do

	factory :article do
		sequence(:title) { |n| "this is article #{n}"}
		body "I'm an article"

		factory :article_with_categories do
			after(:create) do |article|
				article.categories << FactoryGirl.create(:category)
			end
		end
	end
end