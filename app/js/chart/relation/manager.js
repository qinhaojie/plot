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
import * as relations from './index.js';

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
                this.stopRelation()
            }else{
                let type = mode.split('.')[1];
                this.relationType = type;
                this.startRelation(type);
            }
        })

    }

    addRelation(relation) {
        var name = relation.name;
        if(!this.relations[name]){
            this.relations[name] = [];
        }
        this.relations[name].push(relation);
        console.log(name,this.relations)
    }

    startRelation(type) {
        this.start = true;
       
        this.currentRelation = new relations[type](this);
    }
    
    stopRelation(){
        this.start = false;
        this.currentRelation = null;
        
    }

    endCurrentRelation() {
        
        this.addRelation(this.currentRelation);
        this.currentRelation = new relations[this.relationType](this);
        this.chart.blurAll();
    }
}

export default Manager;