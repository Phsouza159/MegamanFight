define(function (require) {
    'use strict';

    let observable = require('app/observable')
        , roles = require('const/roles')

    let keyBoard = class KeyBoard {

        constructor() {

            document.onkeydown = this.checkKey;
        }

        checkKey = (e) => {
            
            e = e || window.event;
            let types = []

            // up
            types[38] = roles.upRow
            // down 
            types[40] = roles.downRow
            // left
            types[37] = roles.leftRow
            // right
            types[39] = roles.rightRow
            // space bar
            types[32] = roles.spaceBarRow

            console.log(`Keyboard : ${e.keyCode}`)
            observable.notify(types[e.keyCode], e)
        }

    }

    return keyBoard
});
