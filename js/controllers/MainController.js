app.controller('MainController', ['$scope', function($scope) {
	
	$scope.competitions = [];
	$scope.teams = [];

	$scope.competition = "";
	$scope.team = "";

	$scope.setQueryCompetition = function(s) {
		$scope.competition = s;
	},

	$scope.setQueryTeam = function(s) {
		$scope.team = s;
	},

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
	},

	$scope.fetchTeams = function() {
		var Competition = Parse.Object.extend("Competition");
		var query = new Parse.Query(Competition);
		console.log($scope.competition);
		query.equalTo("name", $scope.competition);
		query.find().then(function(results) {
			comp = results[0];
			var t = comp.relation("team");
			q = t.query();
			q.find({
				success: function(results) {
					$scope.$apply(function() {
						$scope.teams = results;
					});
				},
				error: function(error) {
					console.log(error);
				}
			});
		});
	}
}]);