/**
 * 关系管理
 * 
 * 
 * m= chart.relationManager = new manager()
 * 
 * m.relations = {
 *      name : []
 * }
 * 
 * m.addRelation('type')
 * 
 * m.startRelation('type')
 * 
 * m.currentRelation
 * 
 * 
 * 
 */
import * as relations from '../../element/relation/index.js';
import Manager from '../manager.js';
class rManager extends Manager{
    constructor(chart) {

        super(...arguments,relations);

    }

    bindEvent(){

        this.chart.on('choose', shape => {
            if (!this.start) return;
            if (this.chart.mode.indexOf('relation') > -1) {

                this.currentElement.addShape(shape)
            }
        });

        this.chart.on('hover', shape => {
            if (!this.start) return;
            if (this.currentElement.shapeInNecessary(shape) && !this.currentElement.shapeInAdded(shape)) {
                shape.focus()
            }
        });
        this.chart.on('hoverout', shape => {
            if (!this.start) return;
            if (!this.currentElement.shapeInAdded(shape)) {
                shape.blur();
            }
        });

        this.chart.on('modechange', mode => {
            if (mode.indexOf('relation.') < 0) {
                this.stopElement()
            } else {
                let type = mode.split('.')[1];
                this.typeName = type;
                this.startElement(type);
            }
        })
    }
}

export default rManager;