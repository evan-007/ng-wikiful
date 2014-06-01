angular.module('ngWikiful', ['ngResource' ,'restangular'])
.config(function($httpProvider) {
	$httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token')
	.attr('content');
})
.controller('articlesCtrl', function($scope, $http, articleFactory, categoryFactory, Restangular){
	
	// $scope.articles = articleFactory.query();
	$scope.categories = categoryFactory.query();
	
	$scope.showArticle = function(article) {
		var articleId = article.id;
		Restangular.one("api/v1/articles", articleId).get()
		.then(function(data){
			$scope.activeArticle = data;
		});
	};

	$scope.getArticles = Restangular.all('api/v1/articles').getList()
	.then(function(data){
		$scope.articles = data;
	});

	$scope.postArticle = function() {
		var activeId = $scope.activeArticle.id;
		var article = $scope.activeArticle;
		// var categories = $scope.activeArticle.categories;
		// $scope.activeArticle.categories_attributes = $scope.activeArticle.categories;

		if (activeId > 0 ) {
			article.put()
			.then(function() {
				Restangular.all('api/v1/articles').getList()
				.then(function(data){
					$scope.articles = data;
				});
			});
		} else {
			Restangular.all('api/v1/articles').post(article)
			.then(function() {
				Restangular.all('api/v1/articles').getList()
				.then(function(data){
					$scope.articles = data;
				});
			});
		}
	};

	$scope.deleteArticle = function(article) {
		var id = article.id;
		Restangular.one("api/v1/articles", id).remove()
		.then(function() {
			$scope.activeArticle = undefined;
			Restangular.all('api/v1/articles').getList()
			.then(function(data){
				$scope.articles = data;
			});
		});
	};

	$scope.resetForm = function() {
		$scope.activeArticle = undefined;
	};
})

.factory('articleFactory', function($resource) {
	return $resource('/api/v1/articles/:id', {id: '@id'}, {
		update: {method: 'PUT'}
	});
})

.factory('categoryFactory', function($resource) {
	return $resource('/api/v1/categories/:id', {id: '@id', });
})

.factory('restangularArticles', function(restangular) {
	var baseArticles = Restangular.all('api/v1/articles');

	baseArticles.getList().then(function(articles){
		$scope.allArticles = articles;
	});
});