import Line from './line.js';
import util from '../../../util.js';


class Polygon extends Line {
    constructor(manager, options={}) {
        options.color = '#ccc';
        super(...arguments);

        this.name = 'polygon';

        // let segment = manager.addByConfig('segment', {
        //     data: [
        //         this.points[this.points.length-1],
        //         this.points[0]
        //     ]
        // })
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

    checkEnd(){
        if(this.points.length < 4) return ;
        var last = this.points.length -1;
        if(this.points[0] === this.points[last]){
            this.end();
        }
    }

    shapeInAdded(shape){
        if(this.points.length < 3){
            return super.shapeInAdded(shape);
        }else{
            if(shape === this.points[0]){
                return false;
            }else{
                return super.shapeInAdded(shape);
            }
        }
    }
}

export default Polygon;