'use strict';

class IntroController {
    static get $inject() {
        return ['$state'];
    }

    constructor($state) {
        this.$state = $state;
    }

    goToTwoPlayerMode() {
        this.$state.go('options');
    }
}

module.exports = IntroController;