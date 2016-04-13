import Line from './line.js';
import util from '../../util.js';


class Segment extends Line {
    constructor(chart, options) {
        //options.color = '#ccc';
        if (options.data.length != 2) {
            throw new Error('只能传入2个点组成一个直线');
        }
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
    
    get k(){
         var [p1, p2] = this.getPoints();
         return (p1[1] - p2[1]) / (p1[0] - p2[0]);
    }

}

export default Segment;