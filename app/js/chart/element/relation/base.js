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
import Element from '../element.js';
class Relation extends Element{
    constructor(manager) {
        super(...arguments);
       
    }

   

    addShape(shape) {
        if(super.addShape(shape) === false) return;
       
        shape.addRelation(this);
        this.checkEnd();
    }

    

    end() {
        console.log('end');
        this.isEnd = true;
        this.buildDom();
        this.bindEvent();
        this.draw();
        this.manager.endCurrentElement();
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
        if(this.isEnd){
            this.group.remove();
            for(let name of this.shapeNames){
                this.shapes[name].forEach(shape =>{
                    shape.removeListener('draw',this.drawCall);
                    shape.removeRelation(this);
                })
            }
            this.manager.removeElementRef(this);
            this.shapes = null;
        }
       
    }
}

export default Relation;