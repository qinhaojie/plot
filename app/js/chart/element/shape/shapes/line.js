import Base from '../base.js';
import util from '../../../util.js';
import Point from './point.js';
import Segment from './segment.js';
const className = 'line shape-line';
class Line extends Base {

    constructor(manager,
        {
            //Point实例
            data = [
            ],
            color = 'none',
            r = 3,
            stroke = '#666'
        } = {},
        autoDraw = false) {
        super(...arguments);

        this.points = [];
        let i = 0;
        for (let point of data) {
            
            if (!point.coordinate) {

                point = manager.addByConfig('point', {
                    data: point
                })
            }



            
            this.points.push(point);
            if(i>0){
                let segment = manager.addByConfig('segment', {
                    data: [
                        this.points[i-1],
                        point
                    ]
                })
            }
            i++;
        }

        this.color = color;
        this.r = r;
        this.stroke = stroke;
        this.buildDom();
        
        this.name = 'line';
        
        this.shapes = {
            point: []
        }
        this.necessaryShape = {
            point: Infinity
        }
        this.shapeNames = Object.keys(this.shapes)
        
        if (autoDraw) {
            this.draw();
        }

        
    }

    draw() {

        //var path = this.getData();

        // this.dom
        //     .attr('d', path)
        // this.proxyDom
        //     .attr('d', path);
        super.draw();
    }


    getData() {
        var p = this.getPoints();
        var path = "M";
        for (let [x, y] of p) {
            path = path + x + ' ' + y + ' ';
        }

        return path;

    }

    /**
     * 获取点的坐标
     * @return [Array] [[x1,y1],[x2,y2]]
     */
    getPoints() {
        return this.points.map(function(point) {
            return point.getData();
        })
    }


    move([dx, dy]) {
        for (let point of this.points) {
            point.move([dx, dy]);
        }
    }

    moveEnd() {

        for (let point of this.points) {
            point.moveEnd();
        }
    }

    addShape(shape){
        if (!this.shapeInNecessary(shape) || this.shapeInAdded(shape)) return false;
        super.addShape(shape);
        this.points.push(shape);

        this.checkEnd();
    }

    bindEvent(){
        this.points.forEach(point=>{
            point.on('move', function () {
                this.draw();
                this.emit('move');
            }.bind(this))
        });
    }

    end(){
        super.end();
    }

}

export default Line;