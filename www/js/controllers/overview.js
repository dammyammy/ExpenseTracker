(function() {
	'use strict';

	angular
		.module('app')
		.controller('overview', OverView);

	function OverView($scope, $filter, $state, BudgetSvc, ExpenseSvc) {
		$scope.budget = BudgetSvc.getBudget();
		$scope.hasExpenses = ExpenseSvc.hasExpenses();
		$scope.totalExpenses = ExpenseSvc.getExpenseTotal();
		$scope.categories = ExpenseSvc.getCategoriesExpenseSummary();
		$scope.expensesCssClass = 'energized';
		$scope.budgetMsg = $scope.totalExpenses <= $scope.budget ? 
			$filter('currency')($scope.budget - $scope.totalExpenses, 'IDR.', 0).concat(' until you hit the monthly limit.') :
			$filter('currency')($scope.totalExpenses - $scope.budget, 'IDR.', 0).concat(' over your monthly limit.');
		$scope.expensesCssClass = 0 === $scope.totalExpenses ? 'dark' : $scope.totalExpenses === $scope.budget ? 'energized' : $scope.totalExpenses > $scope.budget ? 'assertive' : 'balanced';

		$scope.selectionChanged = function (sender) {
			var category = null;
			if (sender.selection && sender.selection.collectionView.currentItem) {
				category = sender.selection.collectionView.currentItem;
				$state.go('app.category-history', { category:category.slug });
			}
		};

		$scope.itemFormatter = function (engine, hitTestInfo, defaultFormat) {
			if (hitTestInfo.chartElement === wijmo.chart.ChartElement.SeriesSymbol) {
				engine.fill = hitTestInfo.item.bgColor;
				engine.stroke = hitTestInfo.item.bgColor;
				defaultFormat();
			}
		};
	}
})();