var app1 = angular.module("myDashBoard", ["ng-fusioncharts"]);
app1.controller('venditeannualiCtrl', ['$scope', function ($scope) {
    $scope.datasource = {
        chart: {
            caption: "Area ...",
            subCaption: "Top 5 stores nell'ultimo mese",
        },
        data: [{
            label: "Bakersfield Central",
            value: "880000"
        },
            {
                label: "Garden Groove harbour",
                value: "730000"
            },
            {
                label: "Los Angeles Topanga",
                value: "590000"
            },
            {
                label: "Compton-Rancho Dom",
                value: "520000"
            },
            {
                label: "Daly City Serramonte",
                value: "330000"
            }]
    };
}])


    .controller('venditemensiliCtrl', ['$scope', function ($scope) {
        $scope.mydataSource = {
            chart: {
                caption: "Quarterly Revenue for FY2013-2014",
                subCaption: "Harry's SuperMart",
                xAxisName: "Quarter",
                yAxisName: "Revenue",
                numberPrefix: "$",
                showValues: "0",
                theme: "fint"
            },
            data: [{
                label: "Q1",
                value: "420000"
            }, {
                    label: "Q2",
                    value: "810000"
                }, {
                    label: "Q3",
                    value: "720000"
                }, {
                    label: "Q4",
                    value: "550000"
                }]
        };

    }])

    .controller("formCtrl", function ($scope, $http) {

        $http.get('http://localhost:3000/account/info').then(function (res) {
            // Se la chiamata va a buon fine
            $scope.Account = res;
        }, function () {
            // Se la chiamata non va a buon fine
        });

        $scope.submitForm = function () {
            if ($scope.form.$valid) {
                alert("Form Submitted!");
            }
        }

    });

