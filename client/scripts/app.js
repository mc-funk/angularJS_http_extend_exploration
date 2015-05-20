var myApp = angular.module('myApp',[]);

myApp.controller('WelcomeController',["$scope", "$http", function($scope, $http) {
    $scope.heading = "Message: ";
    $scope.persons = [];
    $scope.japanStyle = "";
    //Must match function arguments to dependency injection ("$scope, ...

    $scope.updateMessage = function () {
        $scope.message = "Hello, " + $scope.name + "!";
    };

    $scope.goodByeMessage = function () {
        $scope.message = "Goodbye, " + $scope.name;
    };

    $scope.grabinfo = function () {
        console.log("Button click worked!");
        return $http.get('/info').then(function (response) {
            if (response.status !== 200) {
                throw new Error("No call made correctly");
            }
            $scope.persons.push(response.data);
            console.log(response.data);
            return response.data;
        });
    };
    //very common way for RESTful calls to be made

    $scope.getJapan = function () {
        console.log("japan button worked");
        return $http.get("./vendor/japan_geo/japan.json").success(function (data, status) {
            console.log("Japan data: ", data, "status: ", status);
            angular.extend($scope, {
                geojson: {
                    data: data,
                    style: {
                        fillColor: "green",
                        weight: 2,
                        opacity: 1,
                        color: 'white',
                        dashArray: '3',
                        fillOpacity: 0.7
                    }
                }
            });
            console.log($scope.geojson);
            console.log("Type: " + $scope.geojson.data.type)
            console.log("Japan data: ", data, "status: ", status);
            return data;
        });
    };

    $scope.testExtend = function(){
        console.log("testExtend click worked");
        $scope.japanStyle = $scope.geojson.data.type;
        console.log("japanStyle: ", $scope.japanStyle);
    }
}]);