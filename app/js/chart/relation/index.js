/**
 * r = new ralation('type') 
 * r.begin()  
 * 用户进行选择,选择完毕后生成图像
 * r.remove()
 * r.end()
 * 
 * r.addShape()
 * 
 * r.necessaryShape = {
 *      point:1,
 *      segment_straight:1
 * }
 * 
 * r.shapes = {
 *      point : [Point],
 *      segment:[Segment]
 * }
 * 
 * r.shapeInAdded() bool
 * 
 * r.ralationShape = [Line]
 * 
*/

class Ralation {
    constructor(chart) {

        this.chart = chart;
        chart.setMode("relation");
        chart.on('choose', shape => {
            if (chart.mode.indexOf('relation') > -1) {

                this.addShape(shape)
            }
        });

        chart.on('hover', shape => {
            if (this.shapeInNecessary(shape) && !this.shapeInAdded(shape)) {
                shape.focus()
            }
        });
        chart.on('hoverout', shape => {
            if (!this.shapeInAdded(shape)) {
                shape.blur();
            }
        })

        this.shapes = {
            point: []
        }
        this.necessaryShape = {
            point: 2
        }
        this.shapeNames = Object.keys(this.shapes)

    }

    shapeInAdded(shape) {
        for (let name of this.shapeNames) {
            if (this.shapes[name].indexOf(shape) > -1) {
                return true;
            }
        }
        return false;
    }

    shapeInNecessary(shape) {
        var name = shape.name
        return (this.shapeNames.indexOf(name) > -1)
            && (this.shapes[name].length < this.necessaryShape[name])


    }


    addShape(shape) {
        if (!this.shapeInNecessary(shape) || this.shapeInAdded(shape)) return;
        this.shapes[shape.name].push(shape);
        this.checkEnd();
        console.log(this.shapes)
    }

    checkEnd() {
        for (let name of this.shapeNames) {
            if (this.shapes[name].length < this.necessaryShape[name]) {
                return false;
            }
        }
        this.end();
    }

    end() {
        console.log('end')
        this.chart.blurAll()
    }
}

export default Ralation;