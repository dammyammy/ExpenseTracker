(function () {
	'use strict';

	angular
		.module('app')
		.controller('sidemenu', SideMenu);

	function SideMenu($scope) {
		$scope.isWebView = ionic.Platform.isWebView();

		$scope.exit = function () {
			ionic.Platform.exitApp();
		};
	}
})();