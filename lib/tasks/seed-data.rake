task get_data: :environment do
	require 'json'
	require 'open-uri'

	for n in 1..20
		# @lol = JSON.parse(open("http://hipsterjesus.com/api/?paras=1&type=hipster-centric").read)
		# a = Article.new(title: "This is article #{n}", body: @lol.text)
		# a.save
	end
end