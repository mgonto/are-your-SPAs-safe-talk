angular.module('searcher', ['rx']);

angular.module('searcher').service('ApiServer', function($q) {
    var contacts = [{
        name: "Martin Gonto",
        gender: 'male'
    }, {
        name: "John Doe",
        gender: 'male'
    }, {
        name: "Michelle Gonto",
        gender: 'female'
    }];

    this.findByName = function(name) {
        var deferred = $q.defer();
        var results = _.filter(contacts, function(ct) {
            return _.contains(ct.name, name);
        });
        deferred.resolve(results);

        return deferred.promise;
    }

});

angular.module('searcher').controller('MainCtrl', 
    function(ApiServer, rx, $scope) {
        $scope.$createObservableFunction('search')
        .map(function() {
            return $scope.name;
        })
        .flatMap(function(name) {
            return rx.Observable.fromPromise(ApiServer.findByName(name));
        })
        .map(function(contacts) {
            return _.filter(contacts, function(ct) {
                return !$scope.gender || ct.gender === $scope.gender;
            });
        })
        .subscribe(function(people) {
            $scope.people = people;
        }, function(error) {
            console.error("There was an error");
        });
        
        
});

