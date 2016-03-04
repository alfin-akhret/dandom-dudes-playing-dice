angular.module('DudeApp', ['GameService'])
    .controller('MainCtrl', function(Game) {
        var vm = this;

        vm.reset = function() {
            vm.gameSettings = {};
            vm.info = '';
            vm.continueGame = false;
            vm.hasWinners = false;
            vm.gameResult = undefined;
        }
        vm.reset();

        vm.start = function() {
            vm.continueGame = true;
            Game.start(vm.gameSettings)
                .success(function(data) {
                    vm.info = data.message;
                });
        }

        vm.play = function() {
            // emptying previous game result
            vm.gameResult = {};
            Game.play()
                .success(function(data) {
                    vm.gameResult = data;
                    vm.continueGame = data.continueGame;
                    if(data.winners) vm.hasWinners = true;
                });
        }



    });