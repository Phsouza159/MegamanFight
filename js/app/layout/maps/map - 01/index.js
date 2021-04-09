define(function (require) {

    let manipulador = require('app/manipulate')
    , baseMap = require('maps/baseMap')
    , constSprit = require('const/spritTileSeet')
    , megamanPerson = require('person/megamanPerson')

    const imgSeet = 'tile_seet_20x20.png'

    var map = class extends baseMap {

        config = {

        }


        persons = [
            {
                type : constSprit.typeItem.person
                , id : 'megaman-id'
                , layout : {
                    lvl : 4
                    , x : 5
                    , y : 5
                }
                , instance : new megamanPerson(this)
            }
        ]

        itens = [

            //#region LVL 4
            {
                type: constSprit.typeItem.block
                , id: '4df4a213-61ca-448e-8b46-d237594ba563'
                , lvl: 3, x: 3, y: 4
                , style: { img: `./img/${imgSeet}`, ...constSprit.blMetalTp2.topLeft }
            }

            , {
                type: constSprit.typeItem.block
                , id: 'f6b7359c-9097-44e3-8291-00566d5afeb2'
                , lvl: 3, x: { start: 4, end: 55 }, y: 4
                , style: { img: `./img/${imgSeet}`, ...constSprit.blMetalTp2.topCenter }
            }
            , {
                type: constSprit.typeItem.block
                , id: '599fcee7-cd60-42ae-8ce9-a1926772f590'
                , lvl: 3, x: 56, y: 4
                , style: { img: `./img/${imgSeet}`, ...constSprit.blMetalTp2.topRight }
            }
            // inverso
            , {
                type: constSprit.typeItem.block
                , id: '4df4a213-61ca-448e-8b46-d237594ba563'
                , lvl: 3, x: 3, y: 3
                , style: { img: `./img/${imgSeet}`, ...constSprit.blMetalTp2.topLeft, custom : 'invertY' }
            }

            , {
                type: constSprit.typeItem.block
                , id: 'f6b7359c-9097-44e3-8291-00566d5afeb2'
                , lvl: 3, x: { start: 4, end: 55 }, y: 3
                , style: { img: `./img/${imgSeet}`, ...constSprit.blMetalTp2.topCenter, custom : 'invertY'}
            }
            , {
                type: constSprit.typeItem.block
                , id: '599fcee7-cd60-42ae-8ce9-a1926772f590'
                , lvl: 3, x: 56, y: 3
                , style: { img: `./img/${imgSeet}`, ...constSprit.blMetalTp2.topRight, custom : 'invertY'}
            }


            //#endregion
        ]
    }


    return map
})