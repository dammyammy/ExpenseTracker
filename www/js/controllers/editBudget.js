(function() {
	'use strict';

	angular
		.module('app')
		.controller('editBudget', EditBudget);

	function EditBudget($scope, $state, BudgetSvc) {
		$scope.data = {
			budget: BudgetSvc.getBudget()
		};

		$scope.updateBudget = function () {
			BudgetSvc.setBudget($scope.data.budget);
			$scope.cancel();
		};

		$scope.cancel = function () {
			$state.go('app.overview');
		};
	}
})();