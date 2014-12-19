(function() {
	'use strict';

	angular
		.module('app')
		.factory('BudgetSvc', BudgetSvc);

	function BudgetSvc(DataSvc) {
		var svc = {
			getBudget: getBudget,
			setBudget: setBudget
		};

		return svc;

		function getBudget() {
			var expenseObj = DataSvc.get();
			return expenseObj.budget;
		}

		function setBudget(budget) {
			var expenseObj = DataSvc.get();
			expenseObj.budget = budget;
			DataSvc.put(expenseObj);
		}
	}
})();