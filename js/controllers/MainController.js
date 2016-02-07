app.controller('MainController', ['$scope', function($scope) {
	$scope.competitions = [];
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
}]);