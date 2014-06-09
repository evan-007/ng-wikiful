task build_articles: :environment do
	require 'json'
	require 'open-uri'

	

	for n in 1..5
		@lol = JSON.load(open("http://hipsterjesus.com/api/?paras=1&type=hipster-centric"))
		clean = @lol['text'].gsub!('<p>', '').gsub!('</p>', '')
		a = Article.new(title: "This is article #{n}", body: clean)
		a.save
	end
end

task build_categories: :environment do

	categories = ['Ruby', 'Javascript', 'HTML', 'CSS', 'Angular', 'OOP']
	categories.each do |name|
	  cat = Category.new(name: name)
	  cat.save
	end
end

task associate: :environment do
  Article.all.each do |article|
  	art_cat = Category.all.shuffle.first
  	article.update(categories: [art_cat])
  end
end

task test_account: :environment do
  a = User.new(email: 'test@test.com', password: '1234qwer', password_confirmation: '1234qwer')
  a.save
end