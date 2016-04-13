import Line from './line.js';
import util from '../../util.js';


class Segment extends Line {
    constructor(chart, options) {
        //options.color = '#ccc';
        if (options.data.length != 2) {
            throw new Error('只能传入2个点组成一个线段');
        }
        super(...arguments);
        this.name = 'segment';
    }

    get k() {
        var [p1, p2] = this.getPoints();
        return (p1[1] - p2[1]) / (p1[0] - p2[0]);
    }


}

export default Segment;