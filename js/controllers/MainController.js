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
		var c = Parse.Object.extend("Competition");
		var query = new Parse.Query(c);
		var comp;
		query.find({
			success: function(results) {
				$scope.$apply(function() {
					comp = results[0];
					console.log(comp);
				});
			},
			error: function(error) {
				console.log(error);
			}
		});
		var t = new Parse.Relation(comp, "team");
		q = t.query();
		q.find({
			success: function(results) {
				$scope.$apply(function() {
					console.log(results)
					$scope.teams = results;
				});
			},
			error: function(error) {
				console.log(error);
				return;
			}
		});
	}
}]);