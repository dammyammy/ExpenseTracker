(function() {
	'use strict';

	angular
		.module('app')
		.config(function ($stateProvider, $urlRouterProvider) {
			$stateProvider.state('app', {
				url: '/app',
				abstract: true,
				templateUrl: 'templates/sidemenu.tpl.htm',
				controller: 'sidemenu'
			});

			$stateProvider.state('app.overview', {
				url: '/overview',
				views: {
					'main': {
						templateUrl: 'templates/overview.tpl.htm',
						controller: 'overview'
					}
				}
			});

			$stateProvider.state('app.create', {
				url: '/create',
				views: {
					'main': {
						templateUrl: 'templates/createExpense.tpl.htm',
						controller: 'createExpense'
					}
				}
			});

			$stateProvider.state('app.edit-budget', {
				url: '/edit-budget',
				views: {
					'main': {
						templateUrl: 'templates/editBudget.tpl.htm',
						controller: 'editBudget'
					}
				}
			});

			$stateProvider.state('app.categories', {
				url: '/categories',
				views: {
					'main': {
						templateUrl: 'templates/categories.tpl.htm',
						controller: 'categories'
					}
				}
			});

			$stateProvider.state('app.history', {
				url: '/history',
				views: {
					'main': {
						templateUrl: 'templates/history.tpl.htm',
						controller: 'history'
					}
				}
			});

			$stateProvider.state('app.category-history', {
				url: '/history/:category',
				views: {
					'main': {
						templateUrl: 'templates/categoryHistory.tpl.htm',
						controller: 'categoryHistory'
					}
				}
			});

			$stateProvider.state('app.details-grid', {
				url: '/details-grid',
				views: {
					'main': {
						templateUrl: 'templates/detailsGrid.tpl.htm',
						controller: 'detailsGrid'
					}
				}
			});

			$stateProvider.state('app.about', {
				url: '/about',
				views: {
					'main': {
						templateUrl: 'templates/about.tpl.htm'
					}
				}
			});

			$urlRouterProvider.otherwise('/app/overview');
		});
})();