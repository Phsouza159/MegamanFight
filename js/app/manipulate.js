
define(function(require) {

    var manipulate = {

        // get elements
        getById : id => document.getElementById(id) 
        , getByClass : csName => [...document.getElementsByClassName(csName)]

        // manipulate css class
        , addClass : (element, ...csNames) => csNames.forEach( csName => element.classList.add(csName)) 
        , RemoveClass : (element, ...csNames) => csNames.forEach( csName => element.classList.remove(csName)) 

        , addChildElement : (element, child) => element.appendChild(child)

        , getLayouts : () => [...document.getElementsByClassName('lm-table')]

    }

    return manipulate
})