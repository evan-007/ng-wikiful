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
	};

	$scope.postArticle = function() {
		$http.post('api/articles', data = {
			title: $scope.newTitle,
			body: $scope.newBody
		})
		.success(function() {
			$scope.getData();
		});
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