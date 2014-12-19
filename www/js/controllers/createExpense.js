(function () {
	'use strict';

	angular
	.module('app')
	.controller('createExpense', CreateExpense);

	function CreateExpense($scope, $state, CategorySvc, ExpenseSvc) {
		$scope.expense = new Expense('', 0, new Date(), '', null);
		$scope.categories = CategorySvc.getCategoriesWithHtmlContent();
		$scope.addExpense = function () {
			ExpenseSvc.insertExpense($scope.expense);
			$scope.cancel();
		};

		$scope.cancel = function () {
			$state.go('app.overview');
		};
	}
})();