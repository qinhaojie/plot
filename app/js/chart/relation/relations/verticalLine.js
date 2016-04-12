import base from '../base.js';

class VerticalLine extends base {

    constructor() {
        super(...arguments);

        this.shapes = {
            point: []
        }
        this.necessaryShape = {
            point: 2
        }
        this.shapeNames = Object.keys(this.shapes)
    }


}

export default VerticalLine;