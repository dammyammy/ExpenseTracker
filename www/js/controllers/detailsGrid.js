(function() {
	'use strict';

	angular
		.module('app')
		.controller('detailsGrid', DetailsGrid);

	function DetailsGrid($scope, $state, ExpenseSvc) {
		$scope.data = new wijmo.collections.CollectionView(ExpenseSvc.getExpenses());
		$scope.data.trackChanges = true;

		$scope.update = function () {
			if ($scope.data.itemsEdited.length) {
				ExpenseSvc.updateExpense($scope.data.itemsEdited);
				$scope.cancel();
			}
		};

		$scope.cancel = function () {
			$state.go('app.overview');
		};

		$scope.rowEditEnding = function (sender, args) {
			var expense = $scope.data.currentEditItem,
					isValid = isExpenseValid(expense);

			if (!isValid) {
				$scope.data.cancelEdit();
				return;
			}
		};

		function isExpenseValid(expense) {
			return expense &&
						 expense.title !== '' &&
						 expense.title.length < 55 &&
						 wijmo.isNumber(expense.amount) &&
						 wijmo.isDate(expense.date) &&
						 expense.amount >= 0;
		}
	}
})();