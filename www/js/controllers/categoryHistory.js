(function() {
	'use strict';

	angular
		.module('app')
		.controller('categoryHistory', CategoryHistory);

	function CategoryHistory($scope, $stateParams, $ionicListDelegate, $ionicActionSheet, CategorySvc, ExpenseSvc) {
		var category = CategorySvc.getCategoryBySlug($stateParams.category);
		$scope.title = category.name;
		$scope.expenses = ExpenseSvc.getExpensesByCategorySlug(category.slug);

		$scope.confirmDelete = function (expense) {
			var hideSheet = $ionicActionSheet.show({
				titleText: 'Really delete this expense?',
				cancelText: 'Cancel',
				destructiveText: 'Delete',
				cancel: function () {
					$ionicListDelegate.closeOptionButtons();
				},
				destructiveButtonClicked: function () {
					$scope.expenses = ExpenseSvc.deleteExpense(expense.id, category.id);
					hideSheet();
				}
			});
		}
	}
})();