import Base from '../base.js';


const className = 'line shape-func';
const proxyPathWidth = 15;
class Func extends Base {

    constructor(chart,
        {
            data = function() {
            },
            color = '#000'
        } = {}) {
        super(...arguments);

        this.fun = data;
        this.color = color;
        this.buildDom();
        this.dx = 0;
        this.dy = 0;
        this.lastdx = 0;
        this.lastdy = 0;
        
        this.name = 'func';

    }

    draw() {
        var data = this.getData();
        var path = this.genarator(data);
        this.dom
            // .datum(this.getData())
            //  .attr('d', this.genarator.bind(this))
            .attr('d', path)
        this.proxyDom
            .attr('d', path)
        super.draw()
    }

    getData() {

        var pointNumber = this.width;
        var that = this;
        var x = this.scaleX;

        var data = d3.range(pointNumber).map(i => {
            return (
                that.fun(x.invert(i) - that.dx - that.lastdx)
                + that.dy + that.lastdy
            )
        })


        return data;
    }

    genarator(d) {
        var path = '';
        var lastK = 1;
        var x = this.scaleX;
        var y = this.scaleY;
        d.forEach(function(py, i) {
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

        if (this.dom) return;
        super.buildDom();
        this.dom = this.group
            .append('path')
            .attr("class", className)

        this.proxyDom = this.group
            .append('path')
            .attr("class", this.proxyClassName)
            .attr('stroke-width', this.proxyPathWidth)
            .attr('fill', 'none')
            .attr('stroke', 'rgba(0,0,0,0)')


    }

    move([dx, dy]) {
        [this.dx, this.dy] = super.pxToUnit([dx, dy]);
        // this.group
        //     .attr('transform', 'translate(' + dx + ',' + dy + ')')

        this.draw();
    }

    moveEnd() {
        this.lastdx += this.dx;
        this.lastdy += this.dy;
        [this.dx, this.dy] = [0, 0];
    }

}

export default Func;