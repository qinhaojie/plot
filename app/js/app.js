import Chart from './chart/index.js';
import * as math from 'mathjs'
window.math = math
var parser = math.parser();

parser.eval('f(x)=sin(x)')
var fnn = parser.get('f');
parser.eval('f2(x)=cos(x)');


var a = new Chart({
    container: document.getElementById('app'),
    xAxes: {
        domain: [-20.50, 20.50]
    },
    yAxes: {
        domain: [-2, 2]
    },
    content: {
        // func: [
        //     {
        //         data: parser.get('f2')
        //     },
        //     {
        //         data: fnn
        //     }
        // ],
        // point: [
        //     {
        //         data: [1, 0]
        //     }
        // ],
        // straight: [
        //     {
        //         data: [
        //             [1, 1],
        //             [3, 1],
        //
        //
        //         ],
        //         id: '213123'
        //     }
        // ],
        // polygon: [
        //     {
        //         data: [
        //             [0, 1],
        //             [1.5, 1.5],
        //             [-1, 1.3],
        //             [-2, 0]
        //         ]
        //     }
        // ],
        // angle: [
        //     {
        //         data: [
        //             [-2.0, 1.1],
        //             [1.2, 1.2],
        //             [1.1, 0]
        //         ]
        //     }
        // ]
    }
});
window.a = a;
a.draw();
a.on('mousedown', function (e, [x,y]) {

    this.add('point', {
        data: [
            this.scaleX.invert(x),
            this.scaleY.invert(y)
        ]
    })

})

a.on('touchstart', function (e, [x,y]) {

    this.add('point', {
        data: [
            this.scaleX.invert(x),
            this.scaleY.invert(y)
        ]
    })
})

var box = `
    <div id="box">
    <select name="a" id="limit">
        <option value="move">启用缩放</option>
        <option value="add">禁止缩放</option>
        <option value="relation.verticalLine">垂线</option>
        <option value="addElement.point">点</option>
        <option value="addElement.segment">线段</option>
         <option value="addElement.straight">直线</option>
          <option value="addElement.angle">角度</option>
           <option value="addElement.polygon">多边形</option>
    </select>
</div>
`
$('body').append(box)
$('#limit').on('change', function () {

    a.setMode(this.value);
})

