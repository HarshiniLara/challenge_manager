var app = angular.module('challengeApp', ['ngAnimate']);

app.directive('challengeFilter', function () {
    return {
        restrict: 'E',
        templateUrl: 'challengeFilter.html',
        scope: {
            sortOrder: '=',
            searchText: '=',
            showCompletionPercentage: '=',
        },
    };
});

app.factory('ChallengeFactory', ['$http', function($http) {

    return {
        addChallenge: function(activity, duration) {
            return $http.post('http://localhost:3001/challenges/makeChallenge', { name: activity, duration: duration });
        },

        editChallenge: function(challenge) {
            return $http.put('http://localhost:3001/challenges/editChallenge', {
                id: challenge._id,
                newName: challenge.newName,
                newDuration: challenge.newDuration,
                newCurr: challenge.newCurr
            });
        },

        removeChallenge: function(id) {
            return $http.delete('http://localhost:3001/challenges/removeChallenge/' + id);
        },

        getChallenges: function() {
            return $http.get('http://localhost:3001/challenges/getChallenges');
        }
    };
}]);

app.controller('ChallengeController', ['$scope', 'ChallengeFactory', function($scope, ChallengeFactory) {
    $scope.newActivity = '';
    $scope.newDuration = '';
    $scope.challenges = [];

    $scope.challenges.forEach(function(challenge) {
        challenge.editing = false;
    }); 

    $scope.loadChallenges = function() {
        ChallengeFactory.getChallenges()
            .then(function(response) {
                $scope.challenges = response.data;
            })
            .catch(function(error) {
                console.error(error);
                alert('An error occurred: ' + error.data.message);
            });
    };

    $scope.addChallenge = function() {
        ChallengeFactory.addChallenge($scope.newActivity, $scope.newDuration)
            .then(function(response) {
                console.log(response.data.message);
                alert(response.data.message);
                $scope.newActivity = '';
                $scope.newDuration = '';
                $scope.loadChallenges(); 
            })
            .catch(function(error) {
                console.error(error);
                alert('An error occurred: ' + error.data.message);
            });
    };

    $scope.editChallenge = function(challenge) {
        ChallengeFactory.editChallenge(challenge)
            .then(function(response) {
                console.log(response.data.message);
                alert(response.data.message);
                challenge.editing = false; 
                $scope.loadChallenges(); 
            })
            .catch(function(error) {
                console.error(error);
                alert('An error occurred: ' + error.data.message);
            });
    };

    $scope.cancelEdit = function(challenge) {
        challenge.editing = false; 
    };

    $scope.removeChallenge = function(id) {
        ChallengeFactory.removeChallenge(id)
            .then(function(response) {
                console.log(response.data.message);
                $scope.loadChallenges();
            })
            .catch(function(error) {
                console.error(error);
                alert('An error occurred: ' + error.data.message);
            });
    };

    $scope.calculateCompletionPercentage = function(challenge) {
        if (challenge.duration === 0) {
            return 0;
        }
        return (challenge.current / challenge.duration) * 100;
    };

    $scope.incrementDay = function(challenge) {
        if (challenge.current < challenge.duration) { 
            challenge.current++;
            ChallengeFactory.editChallenge(challenge);
            console.log(response.data.message);
            alert(response.data.message);
        }
    };

    $scope.calculateRemainingDays = function(challenge) {
        return Math.max(0, challenge.duration - challenge.current);
    };

    $scope.loadChallenges();
}]);
