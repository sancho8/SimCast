var app = angular.module("SimCast", [])
.controller("mainController", function($scope) {
	$scope.dataSources = ["Amazon", "Best Buy", "Facebook", "Pinterest", "Walmart", "YouTube"];
	$scope.showAdvancedFilters = function(){
		$("#advanced-filters").fadeIn('fast', function() {
			
		});
	};
	$scope.saveAndHideAdvancedFilters = function(){
		$("#advanced-filters").fadeOut('fast', function() {
			
		});
	}
});