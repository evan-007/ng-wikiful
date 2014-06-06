angular.module('ngWikiful', ['ngResource' ,'restangular', 'Devise', 'ngRoute', 'ng-rails-csrf'])
.config(function($httpProvider) {
	$httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token')
	.attr('content');
})
  
.config(function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'templates/main.html',
        controller: 'articlesCtrl'
      }).
      when('/signup', {
        templateUrl: 'templates/signup.html',
        controller: 'userCtrl'
      }).
      when('/signin', {
        templateUrl: 'templates/signin.html',
        controller: 'sessionsCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
})

.run(function($rootScope, Auth) {
  Auth.login().then(function() {
    console.log(Auth.isAuthenticated());
    var currentUser = Auth._currentUser.email;
    console.log(currentUser);
  });
})

.controller('userCtrl', function(Auth, $scope){
  $scope.user = {};
  var credentials = {
    user: {
      email: $scope.user.email,
      name: $scope.user.name,
      password: $scope.user.password,
      password_confirmation: $scope.user.passwordConfirmation
    }
  };
  
  $scope.signUp = function(credentials) {
    console.log(credentials);
    Auth.register(credentials).then(function(registeredUser) {
      console.log(registeredUser);
    }, function(error) {
      console.log(error);
    });
  };
})

.controller('sessionsCtrl', function(Auth, $scope) {
  $scope.user = {};
  var credentials = {
    email: $scope.user.email,
    password: $scope.user.password
  };

  $scope.testAccount = function() {
    $scope.user.email = 'test@test.com';
    $scope.user.password = '1234qwer';
  };
  
  $scope.logIn = function(credentials) {
    Auth.login(credentials).then(function(user) {
      $scope.isLoggedIn = true;
      $scope.currentUser = user.email;
      $scope.user = '';
      $scope.message = "You're logged in as "+user.email;
      console.log(user);
    }, function(error) {
      console.log(error);
    });
  };
  
  $scope.signOut = function() {
    Auth.logout().then(function(oldUser) {
      console.log(oldUser.email + "you're signed out now.");
      $scope.isLoggedIn = false;
    }, function(error) {
      // An error occurred logging out.
    });
  };
  
  $scope.checkIfSession = function () {
    
    $scope.isLoggedIn = Auth.isAuthenticated(); // => false
  };
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