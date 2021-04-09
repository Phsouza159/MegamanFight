
define(function (require) {

    let manipulador = require('app/manipulate')

    var baseMap = class  {

        load = (layouts) => {

            this.loadItens(layouts)
        }

        loadItens = (layouts) => {
            for (let i = 0; i < this.itens.length; i += 1) {

                let item = this.itens[i]
                let layout = layouts[item.lvl - 1]

                if (typeof item.y == 'number') {

                    this.setItemYbyNumber(layout, item)
                }
            }
        }

        getRow = (layout, y) => layout.children[30 - y]

        getPx = (row, x) => row.cells[x]

        getLayoutPx = (lvl, x, y) => {
            let layout = manipulador.getLayouts().find( e => e.dataset.lvl == lvl)
            , row = this.getRow(layout, y)
            return row.cells[x]
        }

        setItemPx = (element, lvl, x , y) => {
          let px = this.getLayoutPx(lvl, x, y)
          px.dataset.type = element.dataset.type
          px.appendChild(element)
        }

        clearItemPx = (lvl, x , y) => { 
            let px = this.getLayoutPx(lvl, x, y)
            px.dataset.type = ''
            px.innerHTML = ''
        }

        getTypePx = (lvl, x, y) => {
            let px = this.getLayoutPx(lvl, x, y)
            return px.dataset.type
        }


        //#region LOAD INTES

        setItemYbyNumber = (layout, item) => {
            let row = this.getRow(layout, item.y)

            if (typeof item.x == 'number') {

                this.setItemXbyNumber(row, item)
                return
            }

            this.setItemXbyCood(row, item)
        }

        setItemXbyNumber = (row, item) => {

            let px = this.getPx(row, item.x)
            this.loadPxItem(px, item)
        }

        setItemXbyCood = (row, item) => {

            for (let i = item.x.start; i <= item.x.end; i += 1) {

                let px = row.cells[i]
                this.loadPxItem(px, item)
            }
        }

        loadPxItem = (px, item) => {
            px.style.background = `url('${item.style.img}') ${item.style.x}px ${item.style.y}px`

            px.dataset.id = item.id
            px.dataset.type = item.type

            if(item.style.custom) {
                manipulador.addClass(px, item.style.custom.split(' '))
            }
        }

        //#endregion

        //#region LOAD PERSONS

        loadPersons = (layouts) => {

            for(let i = 0; i < layouts.length; i += 1){

                let layout = layouts[i]
                let persons = this.persons.filter( e => e.layout.lvl == i + 1)

                if(persons.length) {
                    for(let j = 0; j < persons.length; j += 1){

                        this.setPerson(persons[j], layout)
                    }
                }
            }
        }

        setPerson = (person, layout) => {

           let dataPerson = person.instance.getPerson()
           , row = this.getRow(layout, person.layout.y)
           , px = this.getPx(row, person.layout.x)

           dataPerson.dataset.idPerson = person.id
           dataPerson.dataset.lvl = person.layout.lvl

           person.instance.setCords(person.layout.x, person.layout.y)
           px.dataset.type = dataPerson.dataset.type
           px.appendChild(dataPerson)

           //layout.appendChild(dataPerson)

        }

        //#endregion
    }

    return baseMap
});

