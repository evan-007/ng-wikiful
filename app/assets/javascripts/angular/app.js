angular.module('ngWikiful', ['ngResource' ,'restangular', 'Devise', 'ngRoute', 'ng-rails-csrf'])
  
.config(function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'templates/home.html',
        controller: 'homeCtrl'
      }).
      when('/signup', {
        templateUrl: 'templates/signup.html',
        controller: 'userCtrl'
      }).
      when('/signin', {
        templateUrl: 'templates/signin.html',
        controller: 'sessionsCtrl'
      }).
      when('/articles', {
        templateUrl: 'templates/main.html',
        controller: 'articlesCtrl'
      }).
      when('/categories/:category', {
        templateUrl: 'templates/category.html',
        controller: 'categoryCtrl'
      }).
      when('/articles/:article', {
        templateUrl: 'templates/article.html',
        controller: 'articleCtrl'
      }).
      when('/myarticles', {
        templateUrl: 'templates/myarticles.html',
        controller: 'userArticlesCtrl'
      }).
      otherwise({
        redirectTo: '/'
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

.controller('sessionsCtrl', function(Auth, $scope, authUser) {
  $scope.authUser = authUser;
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
      $scope.authUser = authUser;
      $scope.authUser.id = user.id;
      $scope.authUser.email = user.email;
      $scope.authUser.token = user.auth_token;
      console.log(authUser);
    }, function(error) {
      console.log(error);
    });
  };
  
  $scope.signOut = function() {
    Auth.logout().then(function(oldUser) {
      console.log(oldUser.email + "you're signed out now.");
      $scope.isLoggedIn = false;
      $scope.authUser = authUser;
      $scope.authUser.email = '';
      $scope.authUser.token = '';
    }, function(error) {
      // An error occurred logging out.
    });
  };
  
  $scope.checkIfSession = function () {
    
    Auth.login().then(function() {
      var currentUser = Auth._currentUser;
      $scope.authUser = authUser;
      $scope.authUser.email = Auth._currentUser.email;
      $scope.authUser.token = Auth._currentUser.token;
    });
  };
})

.controller('homeCtrl', function($scope, Restangular, authUser){
  $scope.authUser = authUser;
  
  $scope.getCategories = Restangular.all('api/v1/categories').getList()
  .then(function(data){
    $scope.categories = data;
  });
  
  $scope.getArticles = Restangular.all('home').getList()
  .then(function(data){
    $scope.articles = data;
  });
  
})

.controller('categoryCtrl', function($scope, Restangular, $routeParams){
  var catId = $routeParams.category;
  $scope.getOneCategory = Restangular.one('api/v1/categories', catId).get()
  .then(function(data) {
    console.log(data);
    console.log(catId)
    $scope.category = data;
  });
})

.controller('articleCtrl', function($scope, Restangular, $routeParams){
  var artId = $routeParams.article;
  $scope.getArticle = Restangular.one('api/v1/articles', artId).get()
  .then(function(data) {
    console.log(data);
    $scope.article = data;
  })
})

.controller('userArticlesCtrl', function($scope, Restangular, $routeParams, authUser){
  $scope.authUser = authUser;
  var userId = authUser.id;
  $scope.getUserArticles = Restangular.all('api/v1/users').getList()
  .then(function(data){
    $scope.articles = data;
  });
})

.controller('articlesCtrl', function($scope, $http, Restangular, authUser){
  $scope.authUser = authUser;
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
  $scope.loading = true;
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
      Restangular.one("api/v1/articles", id).put({params: jsonArticle});
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

.factory('authUser', function(){
  return {};
});