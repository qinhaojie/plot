import Segment from './segment.js';
import util from '../../../util.js';

class Straight extends Segment {
    constructor(chart, options) {
        //options.color = '#ccc';
       
        super(...arguments);
        this.name = 'straight';
    }

    getData() {
        var [p1, p2] = this.getPoints();
        var domain = this.chart.layout.w;
        var k = (p1[1] - p2[1]) / (p1[0] - p2[0]);
        var fun = function(x) {
            
            return k*x + p1[1] - k*p1[0];
        }
        var p = [
            [0,fun(0)],
            [domain,fun(domain)]
        ]
        var path = "M";
        for (let [x, y] of p) {
            path = path + x + ' ' + y + ' ';
        }

        return path;
    }
    
    
    // buildDom() {

    //     if (this.dom) return;
    //     super.buildDom();

    //     //path节点放在第一个点之前
    //     var g = document.getElementById(this.id);
    //     var point = this.points[0];
        
    //     if (point) {
    //         var p = document.getElementById(point.id);
    //         p.parentElement.insertBefore(g,p)
    //     }
    //     this.dom = this.group
    //         .append('path')
    //         .attr("class", className)
    //         .style('fill', this.color)
    //         .attr('stroke', this.stroke)

    //         .attr('fill', 'none')
    //         .attr('stroke', 'rgba(0,0,0,0)');
    //     this.tip = this.group
    //         .append('text')
    //         .attr('dx', 3)
    //         .attr('dy', -3)

    //     this.proxyDom = this.group
    //         .append('path')
    //         .attr("class", this.proxyClassName)
    //         .attr('stroke-width', this.proxyPathWidth)

    //         .attr('fill', 'none')
    //         .attr('stroke', 'rgba(0,0,0,0)');
            
    // }

    
    get k(){
         var [p1, p2] = this.getPoints();
         return (p1[1] - p2[1]) / (p1[0] - p2[0]);
    }

}

export default Straight;