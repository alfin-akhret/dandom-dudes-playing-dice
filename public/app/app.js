angular.module('DudeApp', ['GameService'])
    .controller('MainCtrl', function(Game) {
        var vm = this;

        // the game settings
        vm.gameSettings = {};

        vm.start = function() {
            Game.start(vm.gameSettings)
                .success(function(data) {
                    console.log(data);
                });
        }

    });