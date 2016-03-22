import Base from '../base.js';


const className = 'line pattern-func';
class Func extends Base {

    constructor(chart,
        {
            data = function () {
            },
            color = '#000'
            } = {}) {
        super(chart);

        this.fun = data;
        this.color = color;
        this.buildDom();


    }

    draw() {
        super.draw()

        this.dom
            .datum(this.getData())
            .attr('d', this.genarator.bind(this))

    }

    getData() {

        var pointNumber = this.width;
        var that = this;
        var x = this.scaleX;

        var data = d3.range(pointNumber).map(i => {
            return that.fun(x.invert(i))
        })


        return data;
    }

    genarator(d) {
        var path = '';
        var lastK = 1;
        var x = this.scaleX;
        var y = this.scaleY;
        d.forEach(function (py, i) {
            if (!isFinite(py)) return;

            if (!path) {
                path = 'M' + i + ' ' + y(py)
            }


            var dy = py - d[i - 1];
            var dx = x.invert(i) - x.invert(i - 1);
            var k = dy / dx;

            if (k / lastK < 0 && (Math.abs(k) > 1000 || Math.abs(lastK) > 1000)) {


                path += 'M ' + i + ' ' + y(py)
            } else {
                path += 'L ' + i + ' ' + y(py)
            }
            lastK = k
        })
        return path;
    }

    buildDom() {

        if (this.dom)return;
        super.buildDom();
        this.dom = this.group
            .append('path')
            .attr("class", className)
          


    }

}

export default Func;