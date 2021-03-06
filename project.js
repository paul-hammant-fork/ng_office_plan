angular.module('project', ['ngResource', 'base64'])
    .factory('ProjectMongo', function ($resource) {
        var ProjectMongo = $resource(':protocol//:server/data/:db/:q/:r',
            {protocol: 'http:', server: 'localhost:8080', db: 'seatmap', q: 'seats'},
            {update: {method: 'PUT'}});
        ProjectMongo.prototype.update = function (cb) {
            return ProjectMongo.update({r: this._id}, this, cb);
        };
        return ProjectMongo;
    })
    .controller('TheController', function ($scope, $base64, $http, $q, ProjectMongo) {

        var credentials = $base64.encode("editor:changeit");
        $http.defaults.headers.common["Authorization"] = 'Basic ' + credentials;
        var deferred = $q.defer();
        var request = $http.get('http://localhost:8080/_logic/roles/editor', {});
        request.success(function (data, status, headers, config) {
            if (!angular.isUndefined(data) && data !== null && !angular.isUndefined(data.authenticated) && data.authenticated) {
                // TODO - gets this far then barfs with a 401 after a successful (silent) OPTIONS
                ProjectMongo.get({ sort_by: '_id'}, function(rawseats) {
                    $scope.const = {
                        reduceOpacity: "fill-opacity:0.2"
                    };
                    $scope.seats = {};
                    angular.forEach(rawseats.rows, function (value, key) {
                        $scope.seats[value.doc.seat] = value.doc;
                    });
                });
                deferred.resolve();

            } else {
                deferred.reject('authentication failed..');
            }
        });
        request.error(function (data, status, header, config) {
            console.log('authentication error');
            deferred.reject('authentication failed..');
        });

        function getSeat(id) {
            ProjectMongo.get({r: id}, function (seat) {
                console.log("getting... " + id);
                $scope.original = seat;
                $scope.selected = new ProjectMongo($scope.original);
            });
        }

        $scope.matches = function (seatNum) {
            return $scope.find === undefined || $scope.find.length === 0 || ( seatNum in $scope.seats && $scope.seats[seatNum].name.indexOf($scope.find) > -1)
        };

        $scope.show = function (seatNum) {
            if (!(seatNum in $scope.seats)) {
                var toShow = { seat: seatNum, name: "" };
                ProjectMongo.save(toShow, function(selected) {
                    toShow._id = selected.id;
                    $scope.seats[seatNum] = toShow;
                    getSeat(toShow._id);
                });
            } else {
                getSeat($scope.seats[seatNum]._id);
            }
        };

        $scope.isClean = function () {
            return angular.equals($scope.original, $scope.selected);
        };

        $scope.save = function () {
            $scope.selected.update(function () {
                $scope.seats[$scope.selected.seat] = $scope.selected;
                $scope.selected = undefined;
            });
        };
    });
