Parse.initialize("SlG9zvrlCyjen53XU3WUaf3HAYoZQpra08iCLQNC", "GoVut8xNUmBMewqNWftkv0rXTz5RR66Vj2kTW9Kr");

var app = angular.module('app', []);

$(window).load(function() {
	angular.element($(".main")).scope().fetchCompetitions();
});

$(document).on('click', '#competitions li', function(event) {
	$("#competitions li").removeClass("selected");
	$(event.target).addClass("selected");
});