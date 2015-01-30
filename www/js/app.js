// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('todo', ['ionic', 'todo.controllers', 'todo.factories', 'todo.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  })

  //...state of abstract:true. This isn't required, but you want to set this since you'd never go to this state directly,
  // you'd always go to one of it's child states.
  .state('app', {
    url: "/app",
    abstract: true,
    controller: "TodoCtrl",
    templateUrl: "templates/menu.html"
  })

  .state('app.tasks', {
    url: "/tasks",
    views: {
      'menuContent': {
        controller: "TodoCtrl",
        templateUrl: "templates/tasks.html"
      }
    }
  })

  .state('app.404', {
    url: "/404",
    views: {
      'menuContent': {
        controller: "TodoCtrl",
        templateUrl: "templates/404.html"
      }
    }
  })

  .state('app.lorem', {
    url: "/lorem",
    views: {
      'menuContent': {
        controller: "TodoCtrl",
        templateUrl: "templates/lorem.html"
      }
    }
  })

  .state('app.about', {
    url: "/about",
    views: {
      'menuContent': {
        controller: "TodoCtrl",
        templateUrl: "templates/author.html"
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');
});