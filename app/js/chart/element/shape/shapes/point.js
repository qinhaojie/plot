import Base from '../base.js';
import util from '../../../util.js'
const className = 'circle shape-point';
class Point extends Base {

    constructor(manager,
        {
            //坐标系坐标，客户端坐标需要在传之前转换
            data = [],
            color = '#ccc',
            r = 6,
            stroke = '#666'
        } = {},
        autoDraw = false) {
        super(...arguments);

        this.coordinate = data;
        this.lastCoordinate = [data[0], data[1]];
        this.color = color;
        this.r = r;
        this.stroke = stroke;

         this.shapes = {
            point: []
        }
        this.necessaryShape = {
            point: 1
        }

        this.buildDom();
        
        this.name = 'point';

        this.shapeNames=[];

        if (autoDraw) {
            this.draw();
        }

    }

    draw() {

        var [x, y] = this.getData(this.coordinate);

        this.group
            .attr('transform', 'translate(' + x + ',' + y + ')')

        this.tip
            .text(util.approximate(this.coordinate[0]) + ',' + util.approximate(this.coordinate[1]))

        super.draw()
    }

    //将坐标系坐标转换为客户端坐标
    getData(p) {
        if (!p) {
            p = this.coordinate;
        }
        var x = this.scaleX;
        var y = this.scaleY;

        return [x(p[0]), y(p[1])];
    }


    buildDom() {

        if (this.dom) return;

        super.buildDom();

        this.dom = this.group
            .append('circle')
            .attr("class", className)

            .attr('fill', this.color)
            .attr('stroke', this.stroke)
            .attr('r', this.r)
            .attr('cx', 0)
            .attr('cy', 0)
        this.tip = this.group
            .append('text')
            .attr('dx', 3)
            .attr('dy', -3)
            .style('pointer-events','none')

        this.proxyDom = this.group
            .append('circle')
            .attr("class", this.proxyClassName)
            .attr('r', this.r + 5)
            .attr('fill', 'rgba(0,0,0,0)')
            .attr('stroke', 'rgba(0,0,0,0)')


    }

    // isContact(p) {
    //     var r = 6;
    //     return (util.distance(p, this.getData()) <= r)
    // }

    focus() {
        super.focus();
        this.dom.attr('fill', 'red');
    }

    blur() {
        super.blur();
        this.dom.attr('fill', this.color);
    }

    move([dx, dy]) {

        [dx, dy] = super.pxToUnit([dx, dy])
        this.coordinate[0] = this.lastCoordinate[0] + dx;
        this.coordinate[1] = this.lastCoordinate[1] + dy;
        this.draw();
        this.emit('move');
    }

    moveEnd() {
        this.lastCoordinate[0] = this.coordinate[0];
        this.lastCoordinate[1] = this.coordinate[1];
        this.emit('moveend');

    }

    addShape(s) {
        this.coordinate = [...s.coordinate]
        this.lastCoordinate = [...s.coordinate]
        this.shapes.point.push(s)
        this.checkEnd()
    }

    end() {
        this.shapes.point[0].destroy()
        super.end()
    }

}

export default Point;