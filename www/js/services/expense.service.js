(function() {
	'use strict';

	angular
		.module('app')
		.factory('ExpenseSvc', ExpenseSvc);

	function ExpenseSvc(DataSvc, GuidSvc, CategorySvc) {
		var svc = {
			hasExpenses: hasExpenses,
			getExpenseTotal: getExpenseTotal,
			getExpenses: getExpenses,
			getExpensesWithCategory: getExpensesWithCategory,
			getExpenseById: getExpenseById,
			insertExpense: insertExpense,
			deleteExpense: deleteExpense,
			updateExpense: updateExpense,
			getExpensesByCategorySlug: getExpensesByCategorySlug,
			getExpensesByCategoryId: getExpensesByCategoryId,
			getCategoriesExpenseSummary: getCategoriesExpenseSummary
		};

		return svc;

		function hasExpenses() {
			var expenses = getExpenses();
			return expenses && expenses.length > 0;
		}

		function getExpenseTotal() {
			var expenses = getExpenses(),
					total = 0,
					amtArr;

			if (expenses && expenses.length) {
				amtArr = expenses.map(function (expense) {
					return expense.amount;
				});

				total = amtArr.reduce(function (prev, curr) {
					return prev + curr;
				}, 0);
			}

			return total;
		}

		function getExpenses() {
			var expenseObj = DataSvc.get();
			return expenseObj.expenses || [];
		}

		function getExpensesWithCategory() {
			var expenses = getExpenses();
			expenses.forEach(function (expense) {
				expense.category = CategorySvc.getCategoryById(expense.categoryId);
			});
			return expenses;
		}

		function getExpenseById(expenseId) {
			var expenses = getExpenses(),
					tempExpenses;

			tempExpenses = expenses.filter(function (expense) {
				return expense.id === expense;
			});

			return tempExpenses && tempExpenses.length > 0 ? tempExpenses[0] : {};
		}

		function insertExpense(expense) {
			var expenseObj = DataSvc.get();
			expense.id = GuidSvc.getGuid();
			expenseObj.expenses.push(expense);
			DataSvc.put(expenseObj);
		}

		function deleteExpense(expenseId, categoryId) {
			var expenseObj = DataSvc.get(),
					matches,
					index;

			matches = expenseObj.expenses.filter(function (expense) {
				return expense.id === expenseId;
			});

			if (matches && matches.length > 0) {
				index = expenseObj.expenses.indexOf(matches[0]);
				expenseObj.expenses.splice(index, 1);
				DataSvc.put(expenseObj);
			}

			return categoryId ? getExpensesByCategoryId(categoryId) : getExpensesWithCategory() || [];
		}

		function updateExpense(updatedExpenses) {
			var expenseObj;
			if (!updatedExpenses || updatedExpenses.length <= 0) return;
			expenseObj = DataSvc.get();

			for (var i = 0; i < updatedExpenses.length; i++) {
				for (var j = 0; j < expenseObj.expenses.length; j++) {
					if (expenseObj.expenses[j].id == updatedExpenses[i].id) {
						expenseObj[j] = updatedExpenses[i];
						break;
					}
				}
			}

			DataSvc.put(expenseObj);
		}

		function getExpensesByCategorySlug(slug) {
			var category = CategorySvc.getCategoryBySlug(slug);
			return getExpensesByCategoryId(category.id);
		}

		function getExpensesByCategoryId(categoryId) {
			var expenses = getExpenses(),
					category = CategorySvc.getCategoryById(categoryId),
					tempExpenses;

			tempExpenses = expenses.filter(function (expense) {
				return expense.categoryId === categoryId;
			});

			tempExpenses.forEach(function (expense) {
				expense.category = category;
			});

			return tempExpenses || [];
		}

		function getCategoriesExpenseSummary() {
			var categories = CategorySvc.getCategories();

			categories.forEach(function (category) {
				var catExpenses = getExpensesByCategoryId(category.id);
				var catAmtArr = catExpenses.map(function (curr) {
					return curr.amount;
				});

				category.total = catAmtArr.reduce(function (prev, curr) {
					return prev + curr;
				}, 0); 
			});

			return categories;
		}
	}

})();