angular.module('analyshareApp', [])
.controller('MainController', function(MainService) {
    var ctrl = this;
    ctrl.stockCode = null;
})
.service('MainService', function($http){
    this.serviceBaseUrl = 'http://localhost:8888/api/';
    this.getBalanceSheet = function(stockCode) {

    };
});
