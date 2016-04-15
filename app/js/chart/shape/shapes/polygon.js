import Line from './line.js';
import util from '../../util.js';


class Polygon extends Line {
    constructor(chart, options) {
        options.color = '#ccc';
        super(...arguments);

        this.name = 'polygon';

        let segment = chart._add('segment', {
            data: [
                this.points[this.points.length-1],
                this.points[0]
            ]
        })
    }

    // getData() {
    //     var p = this.getPoints();
    //     var path = "M";
    //     for (let [x, y] of p) {
    //         path = path + x + ' ' + y + ' ';
    //     }
    //     path += 'z';
    //     return path;
    // }
}

export default Polygon;