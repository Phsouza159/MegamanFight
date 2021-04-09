
define(function (require) {

    let spritPerson = require('const/spritTileSeet')
        , manipulate = require('app/manipulate')
        , observable = require('app/observable')
        , roles = require('const/roles')
        , BasePerson = require('person/basePerson')




    var megamanPerson = class MegamanPerson extends BasePerson {

        constructor(args = {}) {
            super(args)

            let elemente = document.createElement('div')

            elemente.id = 'megaman-person'
            elemente.dataset.type = 'megaman-person'


            manipulate.addClass(elemente, spritPerson.bgMegamanPeson)

            this.dataPerson = elemente
            this.loadCordsSprit('./img/sprite_megaman.png', spritPerson.pxMegamanPesonStop)
        }


        spritStop = () => {
            this.setCordsSprit(spritPerson.pxMegamanPesonStop)
        }

        _i = 0

        spritLefOrRigthtMove = async () => {
          
            let spPxMove = [
                spritPerson.pxMegamanPesonLeft1
                , spritPerson.pxMegamanPesonLeft2
                , spritPerson.pxMegamanPesonLeft3
                , spritPerson.pxMegamanPesonLeft4
                , spritPerson.pxMegamanPesonLeft5
                , spritPerson.pxMegamanPesonLeft6
            ]

            let validStop = async (spPxMove) => {
               
                await globalScope.timeout(60)

                if( this._i >= spPxMove.length) {
                    this._i = 0
                }

                this.setCordsSprit(spPxMove[this._i])
                this._i += 1
            }

           await validStop(spPxMove)
        }
    }

    return megamanPerson


    /*

    function megamanPerson() {
        var self = this

        this.loadPerson = () => {

           let elementMegaman = document.createElement('div') 
           , elementPersonMain = manipulate.getById(_const.csPersonMain)

           manipulate.addClass(elementMegaman, _const.megamanPeson)
           manipulate.addClass(elementMegaman, _const.megamanStopped)

           manipulate.addChildElement(elementPersonMain, elementMegaman)

        }


        this.test = () => {
            console.log('teste')
        }
    }


    return megaman
    */
});