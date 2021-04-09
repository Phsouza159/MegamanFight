define(function(require) {
    'use strict';

    var events = []

    var observable = {

        registreObservable : (type, observable) => {
            events.push({ type, observable })
        }

        , removeObservable : (type) => {
            events = events.filter( e => e.type != type)
        }

       , notify : (type, data) => {
          events
            .filter( e => e.type == type)
            .map( e => e.observable(data))
       }
    }

    return observable
});
