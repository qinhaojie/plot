import Line from './line.js';
import util from '../../util.js';


class Polygon extends Line {
    constructor(chart, options) {
        options.color = '#ccc';
        super(...arguments);
    }

    getData() {
        var p = this.getPoints();
        var path = "M";
        for (let [x, y] of p) {
            path = path + x + ' ' + y + ' ';
        }
        path += 'z';
        return path;
    }

    buildDom() {
        super.buildDom();
        //将多边形节点放在第一个点之前
        var g = document.getElementById(this.id);
        var point = this.points[0];
        
        if (point) {
            var p = document.getElementById(point.id);
            p.parentElement.insertBefore(g,p)
        }
    }
}

export default Polygon;