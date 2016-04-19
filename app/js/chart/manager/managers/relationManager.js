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
import * as relations from './../../relation/index.js';

class Manager {
    constructor(chart) {
        this.chart = chart;


        /**
         * 存储关系
         * {
         *  verticalLine : [],
         * ...
         * }
         */
        this.relations = {};
        /**
         * 新关系是否开始
         */
        this.start = false;
        chart.on('choose', shape => {
            if (!this.start) return;
            if (chart.mode.indexOf('relation') > -1) {

                this.currentRelation.addShape(shape)
            }
        });

        chart.on('hover', shape => {
            if (!this.start) return;
            if (this.currentRelation.shapeInNecessary(shape) && !this.currentRelation.shapeInAdded(shape)) {
                shape.focus()
            }
        });
        chart.on('hoverout', shape => {
            if (!this.start) return;
            if (!this.currentRelation.shapeInAdded(shape)) {
                shape.blur();
            }
        });

        chart.on('modechange', mode => {
            if (mode.indexOf('relation.') < 0) {
                this.stopElement()
            } else {
                let type = mode.split('.')[1];
                this.relationType = type;
                this.startElement(type);
            }
        })

    }

    addElement(element) {
        var name = element.name;
        if (!this.relations[name]) {
            this.relations[name] = [];
        }
        this.relations[name].push(element);
        console.log(name, this.relations)
        console.log(this.relations[name])
    }

    startElement(type) {
        this.start = true;

        this.currentRelation = new relations[type](this);
    }

    stopElement() {
        this.start = false;
        this.currentRelation = null;

    }

    endCurrentElement() {

        this.addElement(this.currentRelation);
        this.currentRelation = new relations[this.relationType](this);
        this.chart.blurAll();
    }

    removeElement(element) {
        element.destroy();
    }
    
    removeElementRef(element){
        var name = element.name;
        var i = this.relations[name].indexOf(element);
        if(i>-1){
            this.relations[name].splice(i,1);
        }
    }
}

export default Manager;