define(function (require) {

    let manipulate = require('app/manipulate')
        , spritPerson = require('const/spritTileSeet')
        , observable = require('app/observable')
        , roles = require('const/roles')

    const jumpDisplacement = 3
        , timeJumpDisplacementMs = 190
        , lvlItens = 3

    var basePerson = class {

        constructor(args) {

            this.args = args
            this.status = ''
            this.cords = { x: 0, y: 0 }
            this.loadObservables()

            this.statusMoveUp       = roles.statusMove.neutral
            this.statusMoveDown     = roles.statusMove.neutral
            this.statusMoveLeftRight = roles.statusMove.neutral
            this.statusMoveJump     = roles.statusMove.neutral
        }

        loadCordsSprit = (ulrImg, cods) => {
            this.dataPerson.style.background = `url(${ulrImg})`
            this.dataPerson.style.backgroundPositionX = `${cods.x}px`
            this.dataPerson.style.backgroundPositionY = `${cods.y}px`
            this._setCustomCords(cods)
        }

        setCordsSprit = (cods) => {
            this.dataPerson.style.backgroundPositionX = `${cods.x}px`
            this.dataPerson.style.backgroundPositionY = `${cods.y}px`
            this._setCustomCords(cods)
        }

        _setCustomCords = (cods) => {
            
            let csCustom = [...this.dataPerson.classList].find( e => e.includes('custom'))
            
            if(csCustom) {
                manipulate.RemoveClass(this.dataPerson, csCustom)
            }
            
            if(cods.custom) {
                manipulate.addClass(this.dataPerson, cods.custom)
            }
        }

        getPerson = () => this.dataPerson
        getParente = () => this.dataPerson.parentElement
        getPxIndex = () => {
            let parente = this.getParente()
                , px = {}

            if (parente == null || parente.dataset == null) {
                return
            }

            px.x = parseInt(parente.dataset.x)
            px.y = parseInt(parente.dataset.y)
            px.lvl = parseInt(parente.dataset.lvl)

            return px
        }

        setStatusPeson = (csStatus) => manipulate.addClass(csStatus)
        removeStatusPeson = (csStatus) => manipulate.addClass(csStatus)

        setCords = (x, y) => {
            this.cords.x = x
            this.cords.y = y
        }

        updatePxCords = (px) => {
            this.cords.x = px.x
            this.cords.y = px.y
        }


        loadObservables = () => {

            let self = this

            observable.registreObservable(roles.upRow, (e) => self.moveUp(e))
            observable.registreObservable(roles.downRow, (e) => self.moveDown(e))
            observable.registreObservable(roles.leftRow, (e) => self.moveLeft(e))
            observable.registreObservable(roles.rightRow, (e) => self.moveRight(e))
            observable.registreObservable(roles.spaceBarRow, (e) => self.jump(e))
        }

        config = {
            name: 'megaman'
        }



        moveUp = (event) => {

        }

        moveDown = (event) => {

        }

        spritLefOrRigthtMove = () => { }

        moveLeft = async (event) => {
            await this.moveExisX(this.statusMoveLeft, -1)
        }


        moveRight = async (event) => {
            await this.moveExisX(this.statusMoveRight, 1)
        }

        moveExisX = async (status, eixs) => {
            let pxIndex = this.getPxIndex()
            if (pxIndex && (this.statusMoveLeftRight == roles.statusMove.end || this.statusMoveLeftRight == roles.statusMove.neutral)) {

                this.statusMoveLeftRight = roles.statusMove.inProgress

                if (eixs > 0) {
                    pxIndex.x += 1
                    manipulate.RemoveClass(this.dataPerson, spritPerson.invertX)
                } else {
                    manipulate.addClass(this.dataPerson, spritPerson.invertX)
                    pxIndex.x -= 1
                }

                if(this.statusMoveJump != roles.statusMove.inProgress)
                    await this.spritLefOrRigthtMove()

                this.updatePxCords(pxIndex)
                globalScope.getMap().setItemPx(this.dataPerson, pxIndex.lvl, pxIndex.x, pxIndex.y)

                if (this.statusMoveJump != roles.statusMove.inProgress) {
                    this.gravity(pxIndex, -1, () => this.statusMoveRight = roles.statusMove.end)
                }

                this.statusMoveLeftRight = roles.statusMove.end
            }
        }


        jump = () => {
            let pxIndex = this.getPxIndex()
            if (pxIndex && (this.statusMoveJump == roles.statusMove.end || this.statusMoveJump == roles.statusMove.neutral)) {

                this.statusMoveJump = roles.statusMove.inProgress
                this.gravity(pxIndex, 1, () => this.statusMoveJump = roles.statusMove.end)
            }
        }


        gravity = (pxIndex, index, fnEndEvent) => {
            setTimeout(() => {
                let codY = index > 0 ? this.cords.y + 1 : this.cords.y - 1
                    // get type item next px
                    , type = globalScope.getMap().getTypePx(lvlItens, pxIndex.x, codY)

                // check collision with blocks || up
                if (spritPerson.typeItem.block == type && index > -1) {
                    this.gravity(pxIndex, -1, fnEndEvent) // continue down 
                    return
                }
                else if (spritPerson.typeItem.block == type) {
                    return fnEndEvent()
                }

                pxIndex.x = this.cords.x
                pxIndex.y = codY

                this.updatePxCords(pxIndex)

                globalScope.getMap().setItemPx(this.dataPerson, pxIndex.lvl, pxIndex.x, pxIndex.y)

                if (index == jumpDisplacement) {
                    this.gravity(pxIndex, -1, fnEndEvent) // continue down 
                    return
                }

                // end layout
                if (pxIndex.y == 0) {
                    return fnEndEvent()
                }

                this.gravity(pxIndex, (index > 0 ? index += 1 : index -= 1), fnEndEvent) // continue up || down 

            }, timeJumpDisplacementMs)
        }
    }



    return basePerson

})