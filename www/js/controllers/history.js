(function() {
	'use strict';

	angular
		.module('app')
		.controller('history', History);

	function History($scope, $ionicListDelegate, $ionicActionSheet, ExpenseSvc) {
		$scope.expenses = ExpenseSvc.getExpensesWithCategory();

		$scope.confirmDelete = function (id) {
			var hideSheet = $ionicActionSheet.show({
				titleText: 'Remove this expense?',
				cancelText: 'cancel',
				destructiveText: 'delete',
				cancel: function () {
					$ionicListDelegate.closeOptionButtons();
				},
				destructiveButtonClicked: function () {
					$scope.expenses = ExpenseSvc.deleteExpense(id);
					hideSheet();
				}
			})
		}

	}
})();