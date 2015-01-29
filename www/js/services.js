angular.module('todo.services', [])

.service('LoginService', function($q) {
    return {
        getLoginPattern: function() {
            return window.localStorage.getItem("login_pattern");
        },
        setLoginPattern: function(pattern) {
            window.localStorage.setItem("login_pattern", pattern);
        },
        checkLoginPattern: function(pattern) {
            var deferred = $q.defer();
            var promise = deferred.promise;

            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }

            if (pattern == this.getLoginPattern()) {
                deferred.resolve();
            } else {
                deferred.reject();
            }

            return promise;
        }

    }
});