Parse.initialize("SlG9zvrlCyjen53XU3WUaf3HAYoZQpra08iCLQNC", "GoVut8xNUmBMewqNWftkv0rXTz5RR66Vj2kTW9Kr");

var app = angular.module('app', []);

$(window).load(function() {
	angular.element($(".main")).scope().fetchCompetitions();
});

$(document).on('click', '#competitions li', function(event) {
	$("#competitions li").removeClass("selected");
	$(event.target).addClass("selected");
	angular.element($(".main")).scope().setQueryCompetition($(event.target).text().substring(0, $(event.target).text().length));
	angular.element($(".main")).scope().fetchTeams();
	angular.element($(".main")).scope().fetchMatches();
	$(".cueText").fadeOut();
});

$(document).on('click', '#teams li', function(event) {
	if (!$(event.target).hasClass("selected")) {
		$("#teams li").removeClass("selected");
		$(event.target).addClass("selected");
		angular.element($(".main")).scope().setQueryTeam($(event.target).text().substring(0, $(event.target).text().indexOf(' (')));
		var tn = $(event.target).text().substring($(event.target).text().indexOf('(') + 1, $(event.target).text().length - 1);
		angular.element($(".main")).scope().setQueryTeamNumber(tn);
	}
	else {
		$("#teams li").removeClass("selected");
		angular.element($(".main")).scope().setQueryTeam(null);
		angular.element($(".main")).scope().setQueryTeamNumber(null);
	}
	angular.element($(".main")).scope().fetchMatches();
});

$("#matchNumber").on('keyup', function(e) {
    if (e.which == 13) {
        e.preventDefault();
    }
    angular.element($(".main")).scope().setQueryMatch($("#matchNumber").val());
    angular.element($(".main")).scope().fetchMatches();
});
