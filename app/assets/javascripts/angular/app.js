angular.module('ngWikiful', ['ngResource' ,'restangular'])
.config(function($httpProvider) {
	$httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token')
	.attr('content');
})
.controller('articlesCtrl', function($scope, $http, articleFactory, categoryFactory, Restangular){

	// $scope.articles = articleFactory.query();
	$scope.getCategories = Restangular.all('api/v1/categories').getList()
  .then(function(data){
    $scope.categories = data;
  });
	
	$scope.showArticle = function(article) {
		$scope.loading = true;
		Restangular.one("api/v1/articles", article.id).get()
		.then(function(data){
      $scope.loading = false;
			$scope.activeArticle = data;
		});
	};

	$scope.getArticles = 
    $scope.loading = true
    Restangular.all('api/v1/articles').getList()
	.then(function(data){
		$scope.articles = data;
    $scope.loading = false;
	});

	$scope.postArticle = function() {
		gimmeIds($scope.activeArticle.categories);
    var jsonArticle = {
      article: {
        title: $scope.activeArticle.title,
        body: $scope.activeArticle.body,
        category_ids: $scope.activeArticle.catIds,
        id: $scope.activeArticle.id
      }
    };

    var newArticle = {
			article: {
        title: $scope.activeArticle.title,
        body: $scope.activeArticle.body,
        category_ids: $scope.activeArticle.catIds,
      }
    };
		if ($scope.activeArticle.id > 0 ) {
      		var id = $scope.activeArticle.id;
      $scope.loading = true;
      Restangular.one("api/v1/articles", id).put({params: jsonArticle})
			$http.put('/api/v1/articles/'+$scope.activeArticle.id, jsonArticle)
			.then(function() {
				Restangular.all('api/v1/articles').getList()
				.then(function(data){
					$scope.articles = data;
          $scope.loading = false;
				});
			});
		} else {
      $scope.loading = true;
			Restangular.all('api/v1/articles').post(newArticle)
			.then(function() {
				Restangular.all('api/v1/articles').getList()
				.then(function(data){
          $scope.loading = false;
					$scope.articles = data;
				});
			});
		}
	};

	$scope.deleteArticle = function(article) {
		var id = article.id;
    $scope.loading = true;
		Restangular.one("api/v1/articles", id).remove()
		.then(function() {
			$scope.activeArticle = undefined;
			Restangular.all('api/v1/articles').getList()
			.then(function(data){
				$scope.articles = data;
        $scope.loading = false;
			});
		});
	};

	$scope.resetForm = function() {
		$scope.activeArticle = undefined;
	};

	gimmeIds = function(categoriesArray) {
		var idList = [];
    for(var i=0;i<categoriesArray.length;i++){
        var obj = categoriesArray[i];
        for(var key in obj){
            var attrName = key;
            var attrValue = obj[key];
            if (key === "id") {
							console.log(attrValue);
							idList.push(attrValue);
            }
        }
        $scope.activeArticle.catIds = idList;
    }
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