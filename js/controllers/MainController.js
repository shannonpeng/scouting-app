app.controller('MainController', ['$scope', function($scope) {
	
	$scope.competitions = [];
	$scope.teams = [];

	$scope.competition = "";
	$scope.team = "";

	$scope.fetchCompetitions = function() {
		var Competition = Parse.Object.extend("Competition");
		var query = new Parse.Query(Competition);
		query.find({
			success: function(results) {
				$scope.$apply(function() {
					$scope.competitions = results;
				});
			},
			error: function(error) {
			}
		});
	}
	$scope.fetchTeams = function() {
		var Team = Parse.Object.extend("Team");
		var query = new Parse.Query(Team);
		//query.equalTo("Competition", $scope.competition);
		query.find({
			success: function(results) {
				$scope.$apply(function() {
					console.log(results)
					$scope.teams = results;
				});
			},
			error: function(error) {
			}
		});
	}
}]);