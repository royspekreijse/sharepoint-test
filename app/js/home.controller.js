(function () {
  'use strict';

  angular.module('productapp')
    .controller('homeController', ['dataService', '$window', homeController]);

  function homeController(dataService, $window) {
    var vm = this;  // jshint ignore:line
    vm.isLoading = false;
    vm.newItem = null;
    vm.lijstItemsCollection = [];
    vm.documentTypes =[];
    vm.productTypes =[];
    vm.searchstring ="";
    loadTodos();
    /*
    getDocumentTypes();
    getProductTypes();
    function getDocumentTypes(){
      dataService.getDocumentTypes().then(function(data){
        vm.documentTypes = data;
      });
    }
    function getProductTypes(){
      dataService.getProductTypes().then(function(data){
        vm.productTypes = data;
      });
    } 
    */   
    function loadTodos(filter) {
      vm.isLoading = true;
      dataService.getTodos(filter)
        .then(function (todos) {
          vm.lijstItemsCollection = todos;
        })
        .finally(function() {
          vm.isLoading = false;
        });
    }    

  }
})();
