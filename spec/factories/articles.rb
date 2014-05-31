FactoryGirl.define do

	factory :article do
		sequence(:title) { |n| "this is article #{n}"}
		body "I'm an article"
	end
end