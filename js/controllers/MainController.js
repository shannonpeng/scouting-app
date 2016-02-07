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
		var comp = query.find().result;
		console.log(comp);
		var t = comp.relation("team");
		console.log(t);
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