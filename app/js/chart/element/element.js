import Event from 'events';

class Element extends Event{

    constructor(manager) {
        super(...arguments);
        this.manager = manager;
        this.chart = manager.chart;
        this.container = this.chart.graph;
        this.domin = {
            x: [0, manager.chart.layout.w],
            y: [0, manager.chart.layout.h]
        }
    }

    shapeInAdded(shape) {
        for (let name of this.shapeNames) {
            if (this.shapes[name].includes(shape)) {
                return true;
            }
        }
        return false;
    }

    shapeInNecessary(shape) {
        var name = shape.name;
        var fullName = this.getFullName(name);
        return (this.shapeNames.includes(fullName))
            && (this.shapes[fullName].length < this.necessaryShape[fullName])


    }


    /**
     * 意义：
     *  例如在垂线中需要一个直线或者线段，存储在shapeNames当中的key为
     * 'straight_segment',而传入的图形名字只是segment或者straight
     * 这时候需要获取到完整的key
     *
     *
     * @param String name 图形的名称
     * @returns String 该图像名称在关系当中的名字
     */
    getFullName(name) {
        for (let n of this.shapeNames) {
            let ns = n.split('_');
            if (ns.includes(name)) {
                return n;
            }
        }
        return '';
    }

    addShape(shape){
        if (!this.shapeInNecessary(shape) || this.shapeInAdded(shape)) return false;
        this.shapes[this.getFullName(shape.name)].push(shape);
        
    }

    checkEnd() {
        for (let name of this.shapeNames) {
            if (this.shapes[name].length < this.necessaryShape[name]) {
                return false;
            }
        }
        this.end();
    }
    
    end(){
        throw new Error('end 未定义');
    }

}

export default Element;