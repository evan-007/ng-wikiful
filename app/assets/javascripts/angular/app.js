angular.module('agBlog', ['ngAnimate'])
.config(function($httpProvider) {
	$httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token')
	.attr('content');
})
.controller('articlesCtrl', function($scope, $http){
	$scope.getData = function(){
		$http.get('api/articles')
		.success(function(data) {
			console.log(data);
			$scope.articles = data;
		});
	};
	$scope.showArticle = function(article) {
		$scope.activeArticle = article;
		$scope.newTitle = article.title;
		$scope.newBody = article.body;
		$scope.articleID = article.id;
	};

	$scope.postArticle = function(article) {
		var id = $scope.articleID;
		if (typeof id !== "undefined") {
			$http.post('api/article/'+id, data = {
				title: $scope.newTitle,
				body: $scope.newBody
			})
			.success(function() {
				$scope.getData();
			})
		} else {
			$http.post('api/articles', data = {
				title: $scope.newTitle,
				body: $scope.newBody
			})
			.success(function() {
				$scope.getData();
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
});