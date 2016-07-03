(function () {
  'use strict';

  var productapp = angular.module('productapp', [
    'officeuifabric.core',
    'officeuifabric.components'
  ]);

  productapp.config(['$logProvider', function ($logProvider) {
    if ($logProvider.debugEnabled) {
      $logProvider.debugEnabled(true);
    }
  }]);
})();
