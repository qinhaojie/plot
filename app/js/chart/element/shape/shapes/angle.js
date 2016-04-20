import Line from './line.js';
import util from '../../../util.js';


class Angle extends Line {
    constructor(manager, options) {
        //options.color = '#ccc';
       
        super(...arguments);
        this.name = 'angle';
       
        this.necessaryShape = {
            point: 3
        }
       
    }

    getData() {
        var p = this.getPoints();
        var path = "M";
        for (let [x, y] of p) {
            path = path + x + ' ' + y + ' ';
        }

        return path;
    }

    buildDom() {
        super.buildDom();
        this.tip = this.group
            .append('g')
            .style('pointer-events','none');
        this.angleArc = this.tip.append('path')
        .attr('id','text'+this.id)
        .attr('stroke', '#000');
        this.angleText = this.tip
            .append('text')
            .attr('text-anchor','middle')
            .append('textPath')
            .attr('xlink:href', '#text' +this.id)
            .attr('startOffset','50%')
      

    }

    draw() {
        super.draw();
        var [x, y] = this.points[1].getData();
        var theta = this.getAngleValue();
        var p1 = this.getPointOverVectorByLength(this.vectorA);
        var p2 = this.getPointOverVectorByLength(this.vectorB);
        this.tip
            .attr('transform', 'translate(' + x + ',' + y + ')');
        this.angleArc
            .attr('d', function() {

                return 'M' + p1[0] + ' ' + p1[1] + ',' + p2[0] + ' ' + p2[1];
            });
        this.angleText
            .text(util.approximate(180 * theta / Math.PI))

    }

    getAngleValue() {
        var [p1, p2, p3] = this.getPoints();
        var vectorA = [
            p1[0] - p2[0],
            p1[1] - p2[1]
        ];
        var vectorB = [
            p3[0] - p2[0],
            p3[1] - p2[1]
        ];

        var theta = util.vectorAngle(vectorA, vectorB);
        this.vectorA = vectorA;
        this.vectorB = vectorB;
        return theta;
    }


    /**
     * 根据长度获取矢量上一点
     * 
     * @param v 矢量
     * @param l 长度
     */
    getPointOverVectorByLength(v, l) {
        l = l ? l : 35;
        var theta = Math.atan2(v[1], v[0]);
        return [Math.cos(theta) * l, Math.sin(theta) * l];
    }
}

export default Angle;