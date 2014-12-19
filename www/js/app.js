(function() {
	'use strict';

	angular
		.module('app', ['ionic', 'wj'])
		.run(function ($ionicPlatform, $ionicLoading, $rootScope) {
			$ionicPlatform.ready(function() {
				if(window.cordova && window.cordova.plugins.Keyboard) {
					cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
				}
				if(window.StatusBar) {
					StatusBar.styleDefault();
				}
			});

			$rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
				$ionicLoading.show({
					template: '<i class="icon ion-loading-b"></i>'
				});
			});

			$rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
				$ionicLoading.hide();
			});
		});
})();