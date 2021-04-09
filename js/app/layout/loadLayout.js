define(function(require) { 

    let manipulador = require('app/manipulate')

    const itensX = 60;
    const itensY = 30;

    var loadLayout = class LoadLayout {

        _isLoadGrid = false

        load = () => {

            this.loadGrid()
        }

        setMap = (map) => {
            map.load(manipulador.getLayouts())
        }

        loadPersons = (map) => {
            map.loadPersons(manipulador.getLayouts())
        }

        loadGrid = () => {
            let layout =  manipulador.getById('layout-map-block')

            if(!this._isLoadGrid) {

                for(let index = 1; index <= 4; index += 1) {
                    let table = this.loadTable(index)
                    this.addLayout(layout, table)
                }

                this._isLoadGrid = true
            }
        }

        addLayout = (layout, table) => {
            if(layout.firstChild != null) {
                layout.appendChild(table)
                return;
            }

            layout.insertBefore(table, layout.firstChild)
        }

        loadTable = (iLevel) => {

            let table = document.createElement('table')

            table.id = `layout-map-table-lv-${iLevel}`
            table.dataset.lvl = iLevel

            //manipulador.addClass(table, 'lm-table')
            manipulador.addClass(table, 'lm-table', 'layout-map', 'layout-size')
            
            this.loadCells(table, iLevel)

            return table
        }

        loadCells = (table, iLevel) => {

            for(let y = itensY; y > 0; y -= 1) {

                let tr = document.createElement('tr')

                for(let x = 0; x < itensX; x += 1) {

                    let td = document.createElement('td')
                    td.dataset.x = x
                    td.dataset.y = y
                    td.dataset.lvl = iLevel

                    manipulador.addClass(td, 'lm-table-px')

                    if(tr.firstChild != null) {
                        tr.appendChild(td)
                        continue
                    }
                    
                    tr.insertBefore(td, tr.firstChild)
                }

                if(table.firstChild != null) { 
                    table.appendChild(tr)
                    continue
                }

                table.insertBefore(tr, table.firstChild)
            }
        }
    }

    return loadLayout
})