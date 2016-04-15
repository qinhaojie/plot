/**
 * r = new relation('type') 
 * r.begin()  
 * 用户进行选择,选择完毕后生成图像
 * r.remove()
 * r.end()
 * 
 * r.addShape()
 * 
 * r.necessaryShape = {
 *      point:1,
 *      segment_straight:1
 * }
 * 
 * r.shapes = {
 *      point : [Point],
 *      segment:[Segment]
 * }
 * 
 * r.shapeInAdded() bool
 * 
 * r.RelationShape = [Line]
 * 
*/

class Relation {
    constructor(manager) {

        this.manager = manager;
        this.container = manager.chart.graph;
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


    addShape(shape) {
        if (!this.shapeInNecessary(shape) || this.shapeInAdded(shape)) return;
        this.shapes[this.getFullName(shape.name)].push(shape);
        shape.addRelation(this);
        this.checkEnd();
    }

    checkEnd() {
        for (let name of this.shapeNames) {
            if (this.shapes[name].length < this.necessaryShape[name]) {
                return false;
            }
        }
        this.end();
    }

    end() {
        console.log('end')
        this.buildDom();
        this.bindEvent();
        this.draw();
        this.manager.endCurrentRelation();
    }

    draw() {
        console.log('drew');
    }

    buildDom() {
        this.group = this.container
            .insert('g', 'g:nth-child(2)')
            .attr('class', 'relation');
    }
    
    bindEvent(){
        var that = this;
        this.drawCall = function () {
            return that.draw(...arguments);
        }
        for(let name of this.shapeNames){
            this.shapes[name].forEach(shape =>{
                //shape.on('move',this.draw.bind(this))
                shape.on('draw',this.drawCall)
            })
        }
    }
    
    destroy(){
        this.group.remove();
        for(let name of this.shapeNames){
            this.shapes[name].forEach(shape =>{
                shape.removeListener('draw',this.drawCall);
                shape.removeRelation(this);
            })
        }
        this.manager.removeRelationRef(this);
        this.shapes = null;
    }
}

export default Relation;