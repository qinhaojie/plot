import VertivalLine from './verticalLine'

export default class ParallelLine extends VertivalLine {
  get name(){
      return 'parallelLine';
  }

  getData() {
      var p = this.shapes.point[0].getData();
      var l = this.shapes.straight_segment[0];
      var k = l.k;

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