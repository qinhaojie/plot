import Base from '../base.js';
import util from '../../../util.js';
import Point from './point.js';

const className = 'line shape-segment';
class Segment extends Base {
    constructor(manager,
        {
            //Point实例
            data = [],
            color = 'none',
            r = 3,
            stroke = '#666'
        } = {},
                autoDraw = false) {
        super(...arguments);

        this.points = [];

        for (let point of data) {

            if (!point.coordinate) {

                point = manager.addByConfig('point', {
                    data: point
                })
            }




            this.points.push(point);
        }

        this.color = color;
        this.r = r;
        this.stroke = stroke;

        this.shapes = {
            point: []
        }
        this.necessaryShape = {
            point: 2
        }
        this.shapeNames = Object.keys(this.shapes)


        this.buildDom();

        this.name = 'segment';

        if (autoDraw) {
            this.draw();
            this.bindEvent();
        }


    }

    draw() {

        var path = this.getData();

        this.dom
            .attr('d', path)
        this.proxyDom
            .attr('d', path);
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
        return this.points.map(function (point) {
            return point.getData();
        })
    }

    bindEvent(){
        this.points.forEach(point=>{
            point.on('move', function () {
                this.draw();
                this.emit('move');
            }.bind(this))
        });
    }

    buildDom() {

        if (this.dom) return;
        super.buildDom();

        //path节点放在第一个点之前
        var g = document.getElementById(this.id);
        var point = this.points[0];

        if (point) {
            var p = document.getElementById(point.id);
            p.parentElement.insertBefore(g, p)
        }
        this.dom = this.group
            .append('path')
            .attr("class", className)
            .style('fill', this.color)
            .attr('stroke', this.stroke)

        this.tip = this.group
            .append('text')
            .attr('dx', 3)
            .attr('dy', -3)

        this.proxyDom = this.group
            .append('path')
            .attr("class", this.proxyClassName)
            .attr('stroke-width', this.proxyPathWidth)

            .attr('fill', 'none')
            .attr('stroke', 'rgba(0,0,0,0)');

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

    get k() {
        var [p1, p2] = this.getPoints();
        return (p1[1] - p2[1]) / (p1[0] - p2[0]);
    }

    addShape(shape){
        if (!this.shapeInNecessary(shape) || this.shapeInAdded(shape)) return false;
        super.addShape(shape);
        this.points.push(shape);

        this.checkEnd();
    }


}

export default Segment;