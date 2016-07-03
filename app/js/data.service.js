(function () {
  'use strict';

  angular.module('productapp')
    .service('dataService', ['$q', '$http', 'sharepointApi', 'spListName', dataService]);

  function dataService($q, $http, sharepointApi, spListName) {
    return {
      getTodos: getTodos,
      getDocumentTypes:getDocumentTypes,
      getProductTypes:getProductTypes
    };

    function getDocumentTypes(){
      var deferred = $q.defer();
      var url =sharepointApi + "web/Lists/GetByTitle('"+ spListName +"')/Fields?$filter=StaticName%20eq%20%27Document_x0020_Type%27";
      $http({ method: "GET", url: url, headers: { "Accept": "application/json; odata=verbose" } }).success(function (data) {
                        
          deferred.resolve(data.d.results[0].Choices.results);
      }).error(function (data) {
          deferred.resolve([]);
      });      
      return deferred.promise;
    }

    function getProductTypes(){
      var deferred = $q.defer();
      var url =sharepointApi + "web/Lists/GetByTitle('"+ spListName +"')/Fields?$filter=StaticName%20eq%20%27Product_x0020_Type%27";
      $http({ method: "GET", url: url, headers: { "Accept": "application/json; odata=verbose" } }).success(function (data) {                        
          deferred.resolve(data.d.results[0].Choices.results);
      }).error(function (data) {
          deferred.resolve([]);
      });      
      return deferred.promise;
    }

    function getTodos(filter) {
      var deferred = $q.defer();
      var filterstring = "";
      if (filter){
        filterstring = "&$filter=substringof('" + filter + "',Name) ne false"; 
      }
      //_api/web/GetFolderByServerRelativeUrl('/Product%20Library/')/files
      var url = sharepointApi + 'web/GetFolderByServerRelativeUrl(\'' + spListName + '\')/files?$select=Name,TimeLastModified,ServerRelativeUrl&$expand=ListItemAllFields&$orderby=Name asc&' + filterstring;
    
      completeList(url).then(function(results){
        var listitems = [];
        deferred.resolve(results);
      });    
      return deferred.promise;
    };
    function completeList (url) {
            var deferred = $q.defer();
            var results = [];
            $http({ method: "GET", url: url, headers: { "Accept": "application/json; odata=verbose" } }).success(function (data) {
                results = results.concat(data.d.results);
                /*
                if (data.d.__next !== undefined) {
                    completeList(data.d.__next).then(function (data) {
                        results = results.concat(data);
                        deferred.resolve(results);
                    });
                } else {
                */
                    deferred.resolve(results);
                /*
                }
                */
            }).error(function (data) {
                deferred.resolve(results);
            });
            return deferred.promise;
        };
  }
})();
