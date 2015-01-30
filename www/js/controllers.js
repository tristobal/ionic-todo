angular.module('todo.controllers', [])

/*.controller('LoginCtrl', function($scope, LoginService, $state, $location) {
    $scope.log_pattern = LoginService.getLoginPattern();

    var lock = new PatternLock("#lockPattern", {

        onDraw:function(pattern){

            if ($scope.log_pattern) {
                
                LoginService.checkLoginPattern(pattern).success(function(data) {
                    console.log("Login OK");
                    lock.reset();
                    $location.path("/app");
                    //$state.go('app');
                }).error(function(data) {
                    console.log("error");
                    lock.error();
                });
            } else {
                console.log("Login failed");
                LoginService.setLoginPattern(pattern);
                lock.reset();
                $scope.$apply(function() {
                    $scope.log_pattern = LoginService.getLoginPattern();    
                });
            }
        }
    });

})*/

.controller('TodoCtrl', function($scope, $timeout, $ionicModal, Projects, $ionicSideMenuDelegate, Author, $location) {

  // A utility function for creating a new project with the given projectTitle
  var createProject = function(projectTitle) {
    var newProject = Projects.newProject(projectTitle);
    $scope.projects.push(newProject);
    Projects.save($scope.projects);
    $scope.selectProject(newProject, $scope.projects.length-1);
  }


  // Load or initialize projects
  $scope.projects = Projects.all();

  // Grab the last active, or the first project
  $scope.activeProject = $scope.projects[Projects.getLastActiveIndex()];

  // Called to create a new project
  $scope.newProject = function() {
    var projectTitle = prompt('Project name');
    if(projectTitle) {
      createProject(projectTitle);
    }
  };

  // Called to select the given project
  $scope.selectProject = function(project, index) {
    $scope.activeProject = project;
    Projects.setLastActiveIndex(index);
    $ionicSideMenuDelegate.toggleLeft(false);
    $location.path("/app/tasks");
    $scope.$broadcast('cambioProyecto');
  };

  $scope.$on('cambioProyecto',function() {
      $scope.activeProject = $scope.projects[Projects.getLastActiveIndex()];
  });


  // Create and load the Modal
  $ionicModal.fromTemplateUrl('templates/new-task.html', function(modal) {
    $scope.taskModal = modal;
  }, {
    scope: $scope,
    animation: 'slide-in-up'
  });

  $scope.saveDone = function(task) {
    Projects.save($scope.projects);
  };

  // Called when the form is submitted
  $scope.createTask = function(task) {
    if(!$scope.activeProject || !task) {
      return;
    }
    $scope.activeProject.tasks.push({
      title: task.title,
      done: false
    });
    $scope.taskModal.hide();

    // Inefficient, but save all the projects
    Projects.save($scope.projects);

    task.title = "";
  };

  $scope.closeNewTask = function() {
    $scope.taskModal.hide();
  };

  $scope.newTask = function() {
    $scope.taskModal.show();
  };

  $scope.toggleProjects = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };
    // Try to create the first project, make sure to defer
  // this by using $timeout so everything is initialized
  // properly
  $timeout(function() {
    if($scope.projects.length == 0) {
      while(true) {
        var projectTitle = prompt('Your first project title:');
        if(projectTitle) {
          createProject(projectTitle);
          break;
        }
      }
    }
  });

  $scope.author;
  getAuthor();

  function getAuthor() {
    Author.getAuthor()
          .success(function (randomUser) {
              $scope.author = randomUser;
          })
          .error(function (error) {
            console.log('Unable to load customer data: ' + error.message);
            //$scope.status = 'Unable to load customer data: ' + error.message;
          });
  }
  $scope.changeURL = function() {
    //$scope.activeProject.title = "Lorem ipsum";
    $location.path("/app/lorem");
    //$scope.$apply();
    $ionicSideMenuDelegate.toggleLeft(false);
  }
});