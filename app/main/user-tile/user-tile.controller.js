'use strict';

class UserTileController {

    getProfileImg() {
        return require(`../../images/${this.profile}`);
    }
}

module.exports = UserTileController;