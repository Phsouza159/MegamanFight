
define(function () {

    return Object.freeze({
        
        _ : ''

        , invertX : 'invertX'
        , invertY : 'invertY'

        //#region PERSONS
        
        , bgMegamanPeson : 'megaman-peson'
        , pxMegamanPesonStop : { x : 425, y : 520 , custom : 'custom-megaman-peson-left-stop' }
        , pxMegamanPesonLeft1 : { x : 323, y : 520 , custom : 'custom-megaman-peson-left-lv1'}
        , pxMegamanPesonLeft2 : { x : 288, y : 520 , custom : 'custom-megaman-peson-left-lv2' }
        , pxMegamanPesonLeft3 : { x : 243, y : 520 , custom : 'custom-megaman-peson-left-lv3' }
        , pxMegamanPesonLeft4 : { x : 211, y : 520 , custom : 'custom-megaman-peson-left-lv4' }
        , pxMegamanPesonLeft5 : { x : 177, y : 520 , custom : 'custom-megaman-peson-left-lv5' }
        , pxMegamanPesonLeft6 : { x : 149, y : 520 , custom : 'custom-megaman-peson-left-lv6' }

        //#endregion

        //#region LAYOUT

        , typeItem : {
            empty : 'type-empty-item'
            , block : 'type-bloc-item'
            , person : 'type-person-item'
        }

        // type 1 metal rectangular block

        // type 2 metal rectangular block
        , blMetalTp2 : {
            topLeft : { x: 500, y: 120 }
            , 
            topCenter : { x: 480, y: 120 }
            ,
            topRight : { x: 460, y: 120 }
        }

        //#endregion
    })
});

