angular.module('agBlog', ['ngResource' ,'restangular'])
.config(function($httpProvider) {
	$httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token')
	.attr('content');
})
.controller('articlesCtrl', function($scope, $http, articleFactory, categoryFactory, Restangular){
	
	// $scope.articles = articleFactory.query();
	$scope.categories = categoryFactory.query();
	
	$scope.showArticle = function(article) {
		var articleId = article.id;
		$scope.activeArticle = articleFactory.get({id: articleId});
	};

	$scope.getArticles = Restangular.all('api/v1/articles').getList()
	.then(function(data){
		$scope.articles = data;
	});

	$scope.postArticle = function(article) {
		var activeId = $scope.activeArticle.id;
		var categories = $scope.activeArticle.categories;

		if (activeId > 0 ) {
			articleFactory.update( {id: activeId}, $scope.activeArticle);
			// timeout is bad, refactor for promise
			setTimeout(2300);
			$scope.articles = articleFactory.query();
		} else {
			articleFactory.save($scope.activeArticle);
			$scope.articles = articleFactory.query();
		}
	};

	$scope.deleteArticle = function(article) {
		var id = article.id;
		articleFactory.delete($scope.activeArticle);
		$scope.activeArticle = undefined;
		$scope.articles = articleFactory.query();
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