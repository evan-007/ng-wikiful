angular.module('agBlog', ['ngResource'])
.config(function($httpProvider) {
	$httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token')
	.attr('content');
})
.controller('articlesCtrl', function($scope, $http, articleFactory){
	
	$scope.articles = articleFactory.query();
	
	$scope.showArticle = function(article) {
		$scope.activeArticle = articleFactory.get(article);
	};

	$scope.postArticle = function(article) {
		var id = $scope.articleID;
		if (typeof id !== "undefined") {
			$http.put('api/articles/'+id, data = {
				title: $scope.newTitle,
				body: $scope.newBody
			})
			.success(function() {
				$scope.getData();
				$scope.activeArticle = '';
				$scope.newBody = '';
				$scope.newTitle = '';
				$scope.articleID = undefined;
			})
		} else {
			$http.post('api/articles', data = {
				title: $scope.newTitle,
				body: $scope.newBody
			})
			.success(function() {
				$scope.getData();
				$scope.activeArticle = '';
				$scope.newBody = '';
				$scope.newTitle = '';
				$scope.articleID = undefined;
			});
		}
	};

	$scope.deleteArticle = function(article) {
		var id = article.id;
		$http.delete('api/articles/'+id)
		.success(function() {
			$scope.getData();
			$scope.activeArticle = '';
		});
	};

	$scope.resetForm = function() {
		$scope.newTitle = '';
		$scope.newBody = '';
		$scope.articleID = undefined;
	};
})

.factory('articleFactory', function($resource) {
	return $resource('/api/articles/:id', {id: '@id'});
});