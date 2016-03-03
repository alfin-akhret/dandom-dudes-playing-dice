angular.module('GameService', [])
    .factory('Game', function($http) {
        var Game = {};

        Game.start = function(gameSettings) {
            return $http.post('/api/game/init', gameSettings);
        }

        return Game;
    })