angular.module('DudeApp', ['GameService'])
    .controller('MainCtrl', function(Game) {
        var vm = this;

        // the game settings
        vm.gameSettings = {};
        vm.info = '';
        vm.continueGame = false;

        vm.start = function() {
            Game.start(vm.gameSettings)
                .success(function(data) {
                    vm.info = data.message;
                    vm.continueGame = true;
                });
        }

        vm.play = function() {
            // emptying previous game result
            vm.gameResult = {};
            Game.play()
                .success(function(data) {
                    vm.gameResult = data;
                    if (data.continueGame == false) vm.continueGame = false;
                });
        }

    });