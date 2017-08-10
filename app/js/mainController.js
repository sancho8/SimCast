var app = angular.module("SimCast", [])
.controller("mainController", function($scope) {
	$scope.dataSources = ["Amazon", "Best Buy", "Facebook", "Pinterest", "Walmart", "YouTube"];
	$scope.notifications = [
	{
		content: "You get an upgrade!",
		author: "SimCast Crew",
		time: "12h"
	},
	{
		content: "Hey, welcome to SimCast 1.0. Let us know if you have any questions!",
		author: "SimCast Crew",
		time: "12h"
	}];

	$scope.showSavedSearches = function(){
		$("#savedSearchesModal").fadeIn('400', function() {
			
		});
	}

	$scope.hideSavedSearches = function(){
		$("#savedSearchesModal").fadeOut('400', function() {
			
		});
	}

	$scope.showAdvancedFilters = function(){
		$("#advanced-filters").fadeIn('400', function() {
			
		});
	};
	$scope.saveAndHideAdvancedFilters = function(){
		$("#advanced-filters").fadeOut('400', function() {
		});
	}

	$scope.selectedSearches = [];

	$scope.getNumber = function(num) {
		return new Array(num);   
	};

	$scope.checkSelectedSearches = function(selected, elem){
		console.log(elem);
		if(selected){
			$scope.selectedSearches.push(elem);
		}
		else{
			$scope.selectedSearches.pop(elem);
		}
		if($scope.selectedSearches.length == 0){
			$scope.isSearchesSelected = false;
		}
		else{
			$scope.isSearchesSelected = true;
		}
	};

	$scope.showSettings = function(){
		$("#mainPage").fadeOut('slow', function() {
			
		});
		$("#settingsPage").fadeIn('slow', function() {
			
		});
	}

	$scope.showMainPage = function(){
		$("#settingsPage").fadeOut('slow', function() {
			
		});
		$("#mainPage").fadeIn('slow', function() {
			
		});
	}


	$scope.selectedUsers = [];

	$scope.checkSelectedUsers = function(selected, elem){
		console.log(elem);
		if(selected){
			$scope.selectedUsers.push(elem);
		}
		else{
			$scope.selectedUsers.pop(elem);
		}
		console.log($scope.selectedUsers);
		if($scope.selectedUsers.length == 0){
			$scope.isUsersSelected = false;
		}
		else{
			$scope.isUsersSelected = true;
		}
	};

	$scope.deleteSelectedSearches = function(){
		$scope.savedSearches = $scope.savedSearches.filter(function(e){
			return this.indexOf(e)<0;
		}, $scope.selectedSearches);
		$scope.isSearchesSelected = false;
		$scope.searchProp = undefined;
	}

	$scope.deleteSelectedUsers = function(){
		$scope.users = $scope.users.filter(function(e){
			return this.indexOf(e)<0;
		}, $scope.selectedUsers);
		$scope.isUsersSelected = false;
		$scope.searchUsersProp = undefined;
	}


	$scope.savedSearches = [
	{
		name: 'name1 Hey, welcome to SimCast 1.0. Let us know if you have any questions!',
		upc: '123456123456',
		company: 'company name',
		date: "08.08",
		checked: false
	},
	{
		name: 'a',
		upc: '12345',
		company: 'company name',
		date: "08.08",
		checked: false
	},
	{
		name: 'name3',
		upc: '12345',
		company: 'company name',
		date: "08.08",
		checked: false
	},
	{
		name: 'c',
		upc: '12345',
		company: 'company name',
		date: "09.08",
		checked: false
	},
	{
		name: 'name5',
		upc: '12345',
		company: '1company name',
		date: "08.08",
		checked: false
	},
	{
		name: 'xvb',
		upc: '12345',
		company: 'company name1',
		date: "08.08",
		checked: false
	},
	{
		name: 'name7',
		upc: '12345',
		company: 'company name',
		date: "01.08",
		checked: false
	},
	{
		name: 'name8',
		upc: '12345',
		company: 'company name',
		date: "08.08",
		checked: false
	},
	{
		name: 'name9',
		upc: '12345',
		company: 'company name',
		date: "08.08",
		checked: false
	},
	];

	$scope.users = [
	{
		name: 'Dillon Roberts',
		lastActive: '07.23.17',
		searchesNum: '32',
		isAdmin: true,
		checked: false
	},
	{
		name: 'Julia Jones',
		lastActive: '07.22.17',
		searchesNum: '12',
		isAdmin: false,
		checked: false
	},
	{
		name: 'Murray Stone',
		lastActive: '06.13.17',
		searchesNum: '65',
		isAdmin: false,
		checked: false
	},
	{
		name: 'Julia Jones',
		lastActive: '07.22.17',
		searchesNum: '12',
		isAdmin: false,
		checked: false
	},
	{
		name: 'Julia Jones',
		lastActive: '07.22.17',
		searchesNum: '12',
		isAdmin: false,
		checked: false
	},
	{
		name: 'Julia Jones',
		lastActive: '07.22.17',
		searchesNum: '12',
		isAdmin: false,
		checked: false
	},
	];
});