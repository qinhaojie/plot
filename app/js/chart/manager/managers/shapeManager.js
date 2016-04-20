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
import * as shapes from '../../element/shape/index.js';
import Manager from '../manager.js';
class sManager extends Manager{
    constructor(chart) {

        super(...arguments,shapes);

    }

    bindEvent(){
        
        
        super.bindEvent();
        this.chart.on('modechange', mode => {
            if (mode.indexOf('addElement.') < 0) {
                this.stopElement()
            } else {
                let type = mode.split('.')[1];
                this.typeName = type;
                this.startElement(type);
            }
        })

        this.chart.on('clickBlank', p => {
            if (!this.start) return;
            if (this.chart.mode.indexOf('addElement') > -1) {

                var point=this.addByConfig('point',{
                    data:p
                });
                this.currentElement.addShape(point);
            }
            
        });

        this.chart.on('choose', shape => {
            if (!this.start) return;
            if (this.chart.mode.indexOf('addElement') > -1) {

                this.currentElement.addShape(shape)
            }
        });
    }

    addByConfig(type,config){
        var ret = new this.types[type](this,config,true);
        this.addElement(ret);
        return ret;
    }

   
}

export default sManager;