task get_data: :environment do
	require 'json'
	require 'open-uri'

	

	for n in 1..5
		@lol = JSON.load(open("http://hipsterjesus.com/api/?paras=1&type=hipster-centric"))
		clean = @lol['text'].gsub!('<p>', '').gsub!('</p>', '')
		a = Article.new(title: "This is article #{n}", body: clean)
		a.save
	end
end