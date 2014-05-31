# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
for n in 1..20 
	a = Article.create(title: "Article ##{n}",
		body: "wow what an interesting article about the number #{n}!")
	a.save
end