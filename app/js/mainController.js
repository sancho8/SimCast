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
			$("#settingsPage").fadeIn('slow', function() {

			});
		});
		$("#mainPage").fadeOut('slow', function() {
			$("#settingsPage").fadeIn('slow', function() {

			});
		});
		$("#savedSearchesModal").fadeOut('0', function() {
			
		});
	}

	$scope.showMainPage = function(elemId){
		$(elemId).fadeOut('slow', function() {
			$("#mainPage").fadeIn('slow', function() {

			});
		});
	}

	$scope.slideImage = function(imgSelector){
		$( selector ).animate({
			opacity: 0,
			left: "+=50",
			height: "toggle"
		}, 1000, function() {
			// Animation complete.
		});
	}

	$scope.showUserDropdownModal = false;
	$scope.showReportModal = false;
	$scope.showNotificationModal = false;

	$scope.$watch('showUserDropdownModal', function() {
		if($scope.showUserDropdownModal){
			$scope.showReportModal = false;
			$scope.showNotificationModal = false;
		}
	});

	$scope.$watch('showReportModal', function() {
		if($scope.showReportModal){
			$scope.showUserDropdownModal = false;
			$scope.showNotificationModal = false;
		}
	});

	$scope.$watch('showNotificationModal', function() {
		if($scope.showNotificationModal){
			$scope.showUserDropdownModal = false;
			$scope.showReportModal = false;
		}
	});

	$scope.goToMainPage = function(){
		$("#monthlySubscriptionsPage").fadeOut('slow', function(){});
		$("#searchResultPage").fadeOut('slow', function(){});
		$("#settingsPage").fadeOut('slow', function(){});
		$("#savedSearchesModal").fadeOut('400', function() {
			
		});
		$("#mainPage").fadeIn('slow', function() {
		});
	}

	$scope.showLoginPage = function(){
		$("#mainPage").fadeOut('slow', function() {
			$("#loginPage").fadeIn("slow", function() {

			});
		});
		$("#searchResultPage").fadeOut('slow', function(){});
		$("#monthlySubscriptionPage").fadeOut('slow', function(){});
		$("#settingsPage").fadeOut('slow', function(){});
		$("header").fadeOut('slow', function() {
		});
	}

	$scope.showHeader = function(){
		$("header").fadeIn('slow', function() {

		});
	}

	$scope.subsctiptionUpgraded = function(){
		$("#monthlySubscriptionsPage").fadeOut('slow', function() {
			
		});
		$("#settingsPage").fadeIn('slow', function() {
			
		});
	}

	$scope.hasSubscription = false

	$scope.endSubscription = function(){
		$scope.hasSubscription = false;
	}

	$scope.hideSubscriptionDetails = function(){
		$(".subscription-details").fadeOut('fast', function() {
			
		});
	}

	$scope.addSubscription = function(type){
		switch(type){
			case "bronze": $scope.currentSubscription = $scope.subscriptions[0]; break;
			case "silver": $scope.currentSubscription = $scope.subscriptions[1]; break;
			case "gold": $scope.currentSubscription = $scope.subscriptions[2]; break;
		}
		$scope.hasSubscription = true;
	}

	$scope.showMonthlySubscriptions = function() {
		$("#settingsPage").fadeOut('400', function() {
			$("#monthlySubscriptionsPage").fadeIn('400', function() {

			});
		});
	}

	$scope.backToSettingsPage = function(hidePageId){
		$(hidePageId).fadeOut('400', function() {
			$("#settingsPage").fadeIn('400', function() {

			});
		});
	}

	$scope.subscriptions = [
	{
		type: "Bronze",
		price: "$68.95",
		details1: "2 users",
		details2: "100 product queries",
		imageUrl: "img/ship-bronze.svg"
	},
	{
		type: "Silver",
		price: "$248.95",
		details1: "10 users",
		details2: "500 product queries",
		imageUrl: "img/ship-silver.svg"
	},
	{
		type: "Gold",
		price: "Custom Pricing",
		details1: "Enterprise Users",
		details2: "",
		imageUrl: "img/ship-gold.svg"
	},
	]


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

	$scope.searchEnded = false;

	$scope.animateSearchModal = function(){
		$scope.searchEnded = false;
		$("#mainPage").fadeOut('fast', function() {
			$(".fill").css("display", "none");
			$(".text").css("display", "none");
			$(".loading-item").each(function(index, elem){
				var data = $(this);
				setTimeout( function () {
					data.find(".text").css("display", "block");
					data.find(".fill").css("display", "block");
				},index*1000);
			});
			setTimeout(function(){
				$scope.searchEnded = true;
				$scope.$apply();
			}, 10*970);
		});
	}

	$scope.showSearchResultPage = function(){
		$("#mainPage").fadeOut('400', function() {
			$("#searchResultPage").fadeIn("400", function() {

			});
		});
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
		name: 'Dillon Roberts(Admin)',
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

	$scope.loadItems = [
	{
		firstLine: "Authenticating",
		secondLine: "Data Accessibility"
	},
	{
		firstLine: "Translating",
		secondLine: "UPC Code"
	},
	{
		firstLine: "Scoring",
		secondLine: "Amazon"
	},
	{
		firstLine: "Scoring",
		secondLine: "Facebook"
	},
	{
		firstLine: "Scoring",
		secondLine: "YouTube"
	},
	{
		firstLine: "Scoring",
		secondLine: "BestBuy"
	},
	{
		firstLine: "Scoring",
		secondLine: "Pinterest"
	},
	{
		firstLine: "Scoring",
		secondLine: "Walmart"
	},
	{
		firstLine: "Totalling",
		secondLine: "Score"
	}
	];

	$scope.scores = [
	{
		name: "Amazon",
		score: "644"
	},
	{
		name: "BestBuy",
		score: "639"
	},
	{
		name: "Facebook",
		score: "648"
	},
	{
		name: "Pinterest",
		score: "630"
	},
	{
		name: "Walmart",
		score: "642"
	},
	{
		name: "YouTube",
		score: "N/A"
	}
	]
});