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

    }

    shapeInAdded(shape) {
        for (let name of this.shapeNames) {
            if (this.shapes[name].indexOf(shape) > -1) {
                return true;
            }
        }
        return false;
    }

    shapeInNecessary(shape) {
        var name = shape.name
        return (this.shapeNames.indexOf(name) > -1)
            && (this.shapes[name].length < this.necessaryShape[name])


    }


    addShape(shape) {
        if (!this.shapeInNecessary(shape) || this.shapeInAdded(shape)) return;
        this.shapes[shape.name].push(shape);
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
        this.draw();
        this.manager.endCurrentRelation()
    }
    
    draw(){
        console.log('drew');
    }
}

export default Relation;