'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('myApp', ['ngRoute','ngLocale']);


app.config(function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/inicio', {
            templateUrl: 'view/inicio.html',
            controller: ''
        })
        .when('/consulta', {
            templateUrl: 'view/consulta.html',
            controller: ''
        })
        .when('/resultado', {
            templateUrl: 'view/resultado.html',
            controller: 'ResultadoCtrl'
        })
        .otherwise({
            redirectTo: '/inicio'
        });
    $locationProvider.hashPrefix('!');
});

app.filter('sum', function () {
    return function (data, key) {
        if (typeof(data) === 'undefined' || typeof(key) === 'undefined') {
            return 0;
        }

        var sum = 0;
        for (var i = data.length - 1; i >= 0; i--) {
            sum += parseFloat(data[i][key]);
        }

        return sum;
    }
});

app.controller('ResultadoCtrl', ResultadoCtrl);

function ResultadoCtrl($http, $rootScope, $scope, $routeParams, $location) {
    $rootScope.__pagina = 'Servidor';

    $http({
        method: 'GET',
        url: 'dados.json'
    }).then(function successCallback(r) {
        $scope.dados = r.data.dados;
        console.log($scope.dados);
    }, function errorCallback(response) {

    });
}