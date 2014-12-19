(function() {
	'use strict';

	angular
		.module('app')
		.controller('categories', Categories);

	function Categories($scope, CategorySvc) {
		$scope.categories = CategorySvc.getCategories();

		$scope.reorderCategories = function (from, to) {
			$scope.categories = CategorySvc.reorderCategories(from, to);
		}
	}
})();