app.controller('MainController', ['$scope', function($scope) {
	
	$scope.competitions = [];
	$scope.teams = [];
	$scope.matches = [];

	$scope.competition;
	$scope.team;
	$scope.teamNumber;
	$scope.match;

	$scope.setQueryCompetition = function(s) {
		$scope.competition = s;
	},

	$scope.setQueryTeam = function(s) {
		$scope.team = s;
	},

	$scope.setQueryTeamNumber = function(s) {
		$scope.teamNumber = s;
	},

	$scope.setQueryMatch = function(s) {
		$scope.match = s;
	},

	$scope.organizeMatches = function(array, callback) {
		console.log(array);
		var matchData = [];
		array.sort(function(a, b) {
		    return parseInt(a.attributes.matchNumber) - parseInt(b.attributes.matchNumber);
		});
		var currentMN = -1;
		var currentIndex = -1;
		for (var i = 0; i < array.length; i++) {
			if (parseInt(array[i].attributes.matchNumber) == currentMN)
				matchData[currentIndex].push(array[i]);
			else {
				currentMN = array[i].attributes.matchNumber;
				currentIndex++;
				matchData[currentIndex] = new Array();
				matchData[currentIndex].push(array[i]);
			}
		}
		$scope.matchData = matchData;
		callback();
	}

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

	$scope.fetchMatches = function() {
		var MatchData = Parse.Object.extend("MatchData");
		var query = new Parse.Query(MatchData);
		query.equalTo("competitionName", $scope.competition);
		if (!(isNaN(parseInt($scope.match)))) {
			query.equalTo("matchNumber", parseInt($scope.match));
		}
		if (!(isNaN(parseInt($scope.teamNumber)))) {
			query.equalTo("teamNumber", parseInt($scope.teamNumber));
		}
		console.log(query);
		query.find().then(function(results) {
			$scope.organizeMatches(results, function() {$scope.$apply()});
		});
	}
}]);