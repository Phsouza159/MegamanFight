(function () {

    requirejs.config({
        baseUrl: './js',
        paths: {
            app: './app/'
            , const: './app/consts'
            , person: './app/person'
            , layout: './app/layout'

            , maps: './app/layout/maps'
        }
    });

    /*
    requirejs(['person/megamanPerson'] , (megamanPerson) => {

        var megaman = new megamanPerson()

        console.log(megaman)

        megaman.loadPerson()
    });

    */

    var main = () => {

        window.globalScope = {
            _map: {}
            , getMap : () => globalScope._map
            , timeout : (ms) => {
                return new Promise(resolve => setTimeout(resolve, ms));
            }
        }

        requirejs(['layout/loadLayout'
            , 'maps/map - 01/index'
            , 'app/keyBoard'],
            (loadLayout
                , map
                , keyBoard) => {

                let layout = new loadLayout()
                    , inputKeys = new keyBoard()
                    , mapIndex = new map()

                globalScope._map = new map()

                layout.load()

                layout.setMap(mapIndex)
                layout.loadPersons(mapIndex)
            })
    }



    main()
})()