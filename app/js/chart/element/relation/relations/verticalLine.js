import base from '../base.js';

class VerticalLine extends base {
    
    constructor() {
        super(...arguments);

        this.shapes = {
            point: [],
            straight_segment: []
        }
        this.necessaryShape = {
            point: 1,
            straight_segment: 1
        }
        this.shapeNames = Object.keys(this.shapes)
    }
    
    get name(){
        return 'verticalLine';
    }
    
    draw() {
        this.dom
            .attr('d', this.getData());
    }

    buildDom() {
        if (this.dom) return;
        super.buildDom();
        this.dom = this.group
            .append('path')
            .classed('vertical-line', true);
    }

    getData() {
        var p = this.shapes.point[0].getData();
        var l = this.shapes.straight_segment[0];
        var k = - 1 / l.k;

        var fun = function(x) {
            return k * x + p[1] - k * p[0]
        }

        var path = 'M';
        if (k !== Infinity) {
            this.domin.x.forEach(x => {

                path += x + ' ' + fun(x) + ' ';
            });
        }else{
            path = 'M '+ p[0] +' 0 ' + p[0]+' '+this.domin.y[1]; 
        }


        return path;
    }
}

export default VerticalLine;