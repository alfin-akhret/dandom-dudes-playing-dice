angular.module('GameService', [])
    .factory('Game', function($http) {
        var Game = {};

        Game.start = function(gameSettings) {
            return $http.get('/api/game/init');
        }

        return Game;
    })