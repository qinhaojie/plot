/**
 *
 * 管理的基类
 *
 *
 */
// import * as relations from './../../relation/index.js';

class Manager {
    constructor(chart,types) {
        this.chart = chart;
        this.types = types;

        /**
         * 存储关系
         * {
         *  verticalLine : [],
         * ...
         * }
         */
        this.elements = {};
        /**
         * 新关系是否开始
         */
        this.start = false;
        
        this.bindEvent();

    }

    bindEvent(){
        

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
    }
    
    addElement(element) {
        var name = element.name;
        if (!this.elements[name]) {
            this.elements[name] = [];
        }
        this.elements[name].push(element);
        
    }

    startElement(type) {
        this.start = true;

        this.currentElement = new this.types[type](this);
    }

    stopElement() {
        this.start = false;
        this.currentElement&&this.currentElement.destroy();
        this.currentElement = null;

    }

    endCurrentElement() {

        this.addElement(this.currentElement);
        this.currentElement = new this.types[this.typeName](this);
        this.chart.blurAll();
    }

    removeElement(element) {
        element.destroy();
    }

    removeElementRef(element){
        var name = element.name;
        var i = this.elements[name].indexOf(element);
        if(i>-1){
            this.elements[name].splice(i,1);
        }
    }
}

export default Manager;