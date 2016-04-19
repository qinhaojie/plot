import Base from '../base.js';
import util from '../../../util.js';
import Point from './point.js';

const className = 'line shape-segment';
class Segment extends Base {
     constructor(chart,
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
        if(data.length !=2){
            throw new Error('线段只能由2个点组成');
        }
        for (let point of data) {

            if (!point.coordinate) {

                point = chart._add('point', {
                    data: point
                })
            }


            point.on('move', function() {
                this.draw();
                this.emit('move');
            }.bind(this))

            this.points.push(point);
        }

        this.color = color;
        this.r = r;
        this.stroke = stroke;
        this.buildDom();
        
        this.name = 'segment';
        
        if (autoDraw) {
            this.draw();
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
        return this.points.map(function(point) {
            return point.getData();
        })
    }

    buildDom() {

        if (this.dom) return;
        super.buildDom();

        //path节点放在第一个点之前
        var g = document.getElementById(this.id);
        var point = this.points[0];
        
        if (point) {
            var p = document.getElementById(point.id);
            p.parentElement.insertBefore(g,p)
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


}

export default Segment;