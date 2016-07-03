(function () {
	var productapp = angular.module('productapp');
	productapp.constant('sharepointApi', 'https://{tenant}.sharepoint.com/sites/dev/_api/');
	productapp.constant('spListName', 'Gedeelde  documenten');	
})();