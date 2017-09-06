var app = angular.module("SimCast", ['ngCookies', 'checklist-model'])
.config(function ($httpProvider, $compileProvider) {
	$compileProvider.aHrefSanitizationWhitelist(/^\s*(|blob|):/);
	$httpProvider.defaults.headers.common = {};
	$httpProvider.defaults.headers.post = {};
	$httpProvider.defaults.headers.put = {};
	$httpProvider.defaults.headers.patch = {};
})
.directive('doubleClick', function($timeout, _) {

  var CLICK_DELAY = 300
  var $ = angular.element

  return {
    priority: 1, // run before event directives
    restrict: 'A',
    link: function(scope, element, attrs) {
      var clickCount = 0
      var clickTimeout

      function doubleClick(e, item) {
        e.preventDefault()
        e.stopImmediatePropagation()
        $timeout.cancel(clickTimeout)
        clickCount = 0
        setSearchDataFromSavedSearches(item);
        scope.$apply(function() { scope.$eval(attrs.doubleClick) })
      }

      function singleClick(clonedEvent) {
        clickCount = 0
        if (attrs.ngClick) scope.$apply(function() { scope.$eval(attrs.ngClick) })
        if (clonedEvent) element.trigger(clonedEvent)
      }

      function delaySingleClick(e) {
        var clonedEvent = $.Event('click', e)
        clonedEvent._delayedSingleClick = true
        e.preventDefault()
        e.stopImmediatePropagation()
        clickTimeout = $timeout(singleClick.bind(null, clonedEvent), CLICK_DELAY)
      }

      element.bind('click', function(e) {
        if (e._delayedSingleClick) return
        if (clickCount++) doubleClick(e)
        else delaySingleClick(e)
      })

    }
  }

})
.controller("mainController", function($scope, $http, $cookies, $window) {

	$scope.searchScore = 730

	$scope.getNumberClass = function(){
		if($scope.searchResultData.score < 500){
			return 'red';
		}
		else if($scope.searchResultData.score < 600){
			return 'yellow';
		}
		else if($scope.searchResultData.score < 700){
			return 'green';
		}
		else{
			return 'blue';
		}
	}

	$scope.userEmail = "";
	$scope.userPassword = "";
	$scope.userData = {};
	$scope.loginErrorMessage = "";

	$scope.register = function(){
		var postData = {
			"email": $scope.userEmail,
			"password": $scope.userPassword
		};
		console.log(postData);
		$http({
			method : "POST",
			url : "https://simcast.herokuapp.com/register",
			data : postData,
			headers: {
				'Content-Type': 'application/json'
			}
		}).then(function mySuccess(response) {
			console.log(response);
			$scope.userData = response.data;
			$scope.showMainPage('#loginPage'); 
			$scope.showHeader();
		}, function myError(response) {
			console.log(response);
		});
	}

	$scope.login = function(){
		var postData = {
			"email": $scope.userEmail,
			"password": $scope.userPassword
		};
		console.log(postData);
		$http({
			method : "POST",
			url : "https://simcast.herokuapp.com/login",
			data : postData,
			headers: {
				'Content-Type': 'application/json'
			}
		}).then(function mySuccess(response) {
			console.log(response); 
			$scope.userData = response.data;
			$cookies.putObject('auth', response.data);
			console.log($cookies.getObject('auth'));
			$scope.showMainPage('#loginPage'); 
			$scope.showHeader();
		}, function myError(response) {
			$scope.loginErrorMessage = "Incorrect login/password";
			console.log(response);
		});
	}

	$scope.setSearchDataFromSavedSearches = function(item){
		$scope.searchData.upc = item.upc;
		$scope.searchData.company = item.company;
		$scope.hideSavedSearches();
		console.log(item);
	}

	$scope.loadSavedSearches = function() {
		var header = 'Basic ' + $scope.userData.token;
		$http({
			method : "GET",
			url : "https://simcast.herokuapp.com/search",
			headers: {
				'Content-Type': 'application/json',
				'Authorization': header
			}
		}).then(function mySuccess(response) {
			console.log(response); 
			$scope.savedSearches = response.data;
			$scope.showSavedSearches();
		}, function myError(response) {
			console.log(response);
		});
	}

	$scope.deleteAllSearches = function(){
		alert("delete");
		var header = 'Basic ' + $scope.userData.token;
		$http({
			method : "DELETE",
			url : "https://simcast.herokuapp.com/search",
			headers: {
				'Content-Type': 'application/json',
				'Authorization': header
			}
		}).then(function mySuccess(response) {
			console.log(response); 
			$scope.savedSearches = [];
		}, function myError(response) {
			console.log(response);
		});
	}


	$scope.deleteSelectedSearches = function(){
		/*$scope.savedSearches = $scope.savedSearches.filter(function(e){
			return this.indexOf(e)<0;
		}, $scope.selectedSearches);*/
		var header = 'Basic ' + $scope.userData.token;
		$http({
			method : "DELETE",
			url : "https://simcast.herokuapp.com/search/list",
			data: $scope.selectedSearches,
			headers: {
				'Content-Type': 'application/json',
				'Authorization': header
			}
		}).then(function mySuccess(response) {
			console.log(response); 
			$scope.loadSavedSearches();
		}, function myError(response) {
			console.log(response);
		});
		console.log($scope.selectedSearches);
		$scope.isSearchesSelected = false;
		$scope.searchProp = undefined;
	}

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
			$scope.selectedSearches.splice($scope.selectedSearches.indexOf(elem), 1);
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
		$scope.searchErrorMessage = "";
		$scope.searchData = {};
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
	$scope.searchEnded = false;

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

	/*$scope.$watch('searchEnded', function() {
		if($scope.searchEnded){
			$scope.showUserDropdownModal = false;
			$scope.showReportModal = false;
		}
	});*/

	$scope.goToMainPage = function(){
		$("#monthlySubscriptionsPage").fadeOut('slow', function(){});
		$("#searchResultPage").fadeOut('slow', function(){});
		$("#settingsPage").fadeOut('slow', function(){});
		$("#savedSearchesModal").fadeOut('400', function() {
			
		});
		$("#mainPage").fadeIn('slow', function() {
		});
		$scope.searchErrorMessage = "";
		$scope.searchData = {};
	}

	$scope.checkIfLoggedIn = function(){
		if($cookies.getObject('auth') == undefined){
			$scope.showLoginPage();
		}
		else{
			$scope.userData = $cookies.getObject('auth');
			console.log($scope.userData);
			$("#loginPage").fadeOut("slow", function() {

			});
			$scope.showMainPage();
		}
	}

	$scope.logout = function(){
		$cookies.remove('auth');
		$scope.showLoginPage();
	}

	$scope.initProfileForm = function(){
		$scope.editUser = {};
		$scope.editUser.email = $scope.userData.email; 
		$scope.editUser.firstName = $scope.userData.firstName; 
		$scope.editUser.lastName = $scope.userData.lastName; 
	}

	$scope.initPasswordForm = function(){
		$scope.passwordErrorMessage = "";
		$scope.passwordData = {};
	}

	$scope.updatePassword = function(){
		$scope.passwordErrorMessage = "";
		if($scope.passwordData.newPassword !== $scope.passwordData.confirmPassword){
			$scope.passwordErrorMessage = "Passwords doesn't match";
			return;
		}
		if($scope.passwordData.newPassword === $scope.passwordData.oldPassword){
			$scope.passwordErrorMessage = "New password cannot be same as current password";
			return;
		}
		var postData = {
			"currentPassword": $scope.passwordData.oldPassword,
			"newPassword": $scope.passwordData.newPassword,
		};
		var header = 'Basic ' + $scope.userData.token;
		console.log(postData);
		$http({
			method : "Put",
			url : "https://simcast.herokuapp.com/userUpdatePassword",
			data : postData,
			headers: {
				'Content-Type': 'application/json',
				'Authorization': header
			}
		}).then(function mySuccess(response) {
			console.log(response);
		}, function myError(response) {
			$scope.passwordErrorMessage = "Passwords incorrect";
			console.log(response);
		});
	}

	$scope.updateUser = function(){
		var postData = {
			"email": $scope.editUser.email,
			"firstName": $scope.editUser.firstName,
			"lastName": $scope.editUser.lastName
		};
		var header = 'Basic ' + $scope.userData.token;
		console.log(postData);
		$http({
			method : "Put",
			url : "https://simcast.herokuapp.com/userUpdate",
			data : postData,
			headers: {
				'Content-Type': 'application/json',
				'Authorization': header
			}
		}).then(function mySuccess(response) {
			console.log(response);
		}, function myError(response) {
			console.log(response);
		});
	}


	$scope.filtersList = [
	{value: "AS", text: 'Amazon'},
	{value: "BS", text: 'Best Buy'},
	{value: "FS", text: 'Facebook'},
	{value: "PS", text: 'Pinterest'},
	{value: "WS", text: 'Walmart'},
	{value: "YS", text: 'YouTube'},
	];

	$scope.selectedFilters = $scope.filtersList.slice();

	$scope.savedFilters = true;

	$scope.searchData = {};

	$scope.searchResultData = {};

	$scope.userImage = '';

	$scope.toggleSelectedFilter = function(item){
		var index = $scope.selectedFilters.indexOf(item);

		if (index === -1) {
			$scope.selectedFilters.push(item);
		} else {
			$scope.selectedFilters.splice(index, 1);
		}
		console.log($scope.selectedFilters);
	}

	$scope.getPDFReport = function(){
		var header = 'Basic ' + $scope.userData.token;
		$http({
			method : "Get",
			url : "https://simcast.herokuapp.com/report/pdf",
			responseType: "blob",
			headers: {
				'Content-Type': 'application/json',
				'Authorization': header
			}
		}).then(function mySuccess(response) {
			var data = response.data,
			blob = new Blob([data], { type: 'application/pdf' }),
			url = $window.URL || $window.webkitURL;
			$scope.fileUrl = url.createObjectURL(blob);
			console.log(response);
		}, function myError(response) {
			console.log(response);
		}).then(function customClick(){
			setTimeout(function() {
				document.getElementById('downloadPDF').click();
			}, 500);
		});
	}

	$scope.getEmailReport = function(){
		var header = 'Basic ' + $scope.userData.token;
		$http({
			method : "Get",
			url : "https://simcast.herokuapp.com/report/email",
			headers: {
				'Content-Type': 'application/json',
				'Authorization': header
			}
		}).then(function mySuccess(response) {
			console.log(response);
		}, function myError(response) {
			console.log(response);
		});
	}

	$scope.executeSearch = function(){
		$scope.animateSearchModal();
		if($scope.searchData.upc == "" || $scope.searchData.upc == undefined){
			$scope.searchErrorMessage = "Please enter UPC Code";
			return;
		}
		if($scope.searchData.company == "" || $scope.searchData.company == undefined){
			$scope.searchErrorMessage = "Please enter Product Company";
			return;
		}
		var postData = {
			upc: $scope.searchData.upc,
			company: $scope.searchData.company,
			save: $scope.savedFilters,
			scoring: $scope.selectedFilters.map(function(item) {
				return item.value;
			})
		}
		var header = 'Basic ' + $scope.userData.token;
		$http({
			method : "Get",
			url : "https://simcast.herokuapp.com/scoring",
			params : postData,
			headers: {
				'Content-Type': 'application/json',
				'Authorization': header
			}
		}).then(function mySuccess(response) {
			console.log(response);
			$scope.searchResultData = response.data;

			if($scope.searchResultData.score >= 600){
				$scope.rotateAngle = "rotate(" + (($scope.searchResultData.score-600) * 0.6)  + "deg)";
			}
			if($scope.searchResultData.score < 600){
				$scope.rotateAngle = "rotate(" + (($scope.searchResultData.score-600) * 0.6)  + "deg)";
			}
			console.log($scope.rotateAngle);
			$scope.transformSearchResultDetails();
		}, function myError(response) {
			console.log(response);
		});
		console.log(postData);
	}

	$scope.transformSearchResultDetails = function(){
		var details = $scope.searchResultData.details;
		$scope.searchResultScores = [];
		$scope.searchResultScores.push({
			name: "Amazon",
			score: details.AS !== undefined ? details.AS : "N/A"
		});
		$scope.searchResultScores.push({
			name: "BestBuy",
			score: details.BS !== undefined ? details.BS : "N/A"
		});
		$scope.searchResultScores.push({
			name: "Facebook",
			score: details.FS !== undefined ? details.FS : "N/A"
		});
		$scope.searchResultScores.push({
			name: "Pinterest",
			score: details.PS !== undefined ? details.PS : "N/A"
		});
		$scope.searchResultScores.push({
			name: "Walmart",
			score: details.WS !== undefined ? details.WS : "N/A"
		});
		$scope.searchResultScores.push({
			name: "YouTube",
			score: details.YS !== undefined ? details.YS : "N/A"
		});
		console.log($scope.searchResultScores);
	}

	$scope.getUserImage = function(){
		var postData = {
			email: $scope.userData.email
		}
		var header = 'Basic ' + $scope.userData.token;
		console.log(postData);
		$http({
			method : "GET",
			url : "https://simcast.herokuapp.com/logo",
			headers: {
				'Content-Type': 'application/json',
				'Authorization': header
			},
			responseType: 'blob',
			params: {email: $scope.userData.email}
		}).then(function mySuccess(response) {
			$scope.blob = response.data;
			$scope.userImage = URL.createObjectURL($scope.blob);
			console.log($scope.userImage);
		}, function myError(response) {
			console.log(response);
		});
	}

	$scope.deleteUserImage = function(){
		var header = 'Basic ' + $scope.userData.token;
		$http({
			method : "DELETE",
			url : "https://simcast.herokuapp.com/logo/delete",
			headers: {
				'Content-Type': 'apllication/json',
				'Authorization': header
			}
		}).then(function mySuccess(response) {
			console.log(response);
		}, function myError(response) {
			console.log(response);
		});
	}

	$scope.uploadedIcon = "";

	$scope.uploadUserImage = function(){
		document.getElementById('uploadIconBtn').click();
	}

	$scope.updateUserImage = function(){
		var f = document.getElementById('uploadIconBtn').files[0];
		var postData = {
			"email": $scope.editUser.email,
			"file": f
		};
		var header = 'Basic ' + $scope.userData.token;
		console.log(postData);
		$http({
			method : "POST",
			url : "https://simcast.herokuapp.com/upload/logo",
			data : postData,
			headers: {
				'Content-Type': 'multipart/form-data',
				'Authorization': header
			}
		}).then(function mySuccess(response) {
			console.log(response);
		}, function myError(response) {
			console.log(response);
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

	$scope.rotateAngle = "rotate(-100deg)";

	$scope.getUsers = function(){
		var header = 'Basic ' + $scope.userData.token;
		$http({
			method : "Get",
			url : "https://simcast.herokuapp.com/users",
			headers: {
				'Content-Type': 'application/json',
				'Authorization': header
			}
		}).then(function mySuccess(response) {
			$scope.users = response.data;
			console.log(response);
		}, function myError(response) {
			console.log(response);
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
	}

	$scope.showSearchResultPage = function(){
		$("#mainPage").fadeOut('400', function() {
			$("#searchResultPage").fadeIn("400", function() {

			});
		});
	}

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
});