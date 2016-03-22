import Base from '../base.js';
import util from '../../util.js'
const className = 'circle pattern-point';
class Func extends Base {

    constructor(chart,
        {
            //坐标系坐标，客户端坐标需要在传之前转换
            data=[],
            color='#ccc',
            r = 3,
            stroke = '#666'
            }={},
                autoDraw = false) {
        super(chart);

        this.coordinate = data;
        this.lastCoordinate = [data[0], data[1]];
        this.color = color;
        this.r = r;
        this.stroke = stroke;
        this.buildDom();

        if (autoDraw) {
            this.draw();
        }

    }

    draw() {
        super.draw()
        var [x,y] = this.getData(this.coordinate);

        this.group
            .attr('transform', 'translate(' + x + ',' + y + ')')
        this.dom

            .attr('r', this.r)
            .attr('cx', 0)
            .attr('cy', 0)
        this.tip
            .text(util.approximate(this.coordinate[0]) + ',' + util.approximate(this.coordinate[1]))


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

        if (this.dom)return;

        this.group = this.graph
            .append('g')

        this.dom = this.group
            .append('circle')
            .attr("class", className)
            .attr('id', this.id)
            .attr('fill', this.color)
            .attr('stroke', this.stroke);
        this.tip = this.group
            .append('text')
            .attr('dx', 3)
            .attr('dy', -3)


    }

    isContact(p) {
        var r = 6;
        return (util.distance(p, this.getData()) <= r)
    }

    focus() {
        this.dom.attr('fill', 'red')
    }

    blur() {
        this.dom.attr('fill', this.color)
    }

    move([dx,dy]) {
        //let [x,y] = this.getData();
        //x += dx;
        //y += dy;
        var uxPerPx = this.scaleX(1) - this.scaleX(0);// px/unit
        var uyPerPx = this.scaleY(1) - this.scaleY(0);
        this.coordinate[0] = this.lastCoordinate[0] + dx / uxPerPx;
        this.coordinate[1] = this.lastCoordinate[1] + dy / uyPerPx;
        this.draw();
    }

    moveEnd() {
        this.lastCoordinate[0] = this.coordinate[0];
        this.lastCoordinate[1] = this.coordinate[1];
        this.draw();

    }


}

export default Func;