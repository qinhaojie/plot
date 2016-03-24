import Chart from './chart/index.js';
import * as math from 'mathjs'
window.math = math
var parser = math.parser();

parser.eval('f(x)=sin(x)^3')
var fnn = parser.get('f');
parser.eval('f2(x)=x^3');


var a = new Chart({
    container: document.getElementById('app'),
    xAxes: {
        domain: [-20.50, 20.50]
    },
    yAxes: {
        domain: [-2, 2]
    },
    content: {
        func: [
            {
                data: parser.get('f2')
            },
            {
                data: fnn
            }
        ],
        point: [
            {
                data: [1, 0]
            }
        ],
        line:[
            {
                data:[
                    [1,1],
                    [3,1],
                    [2,1.5],
                   
                ]
            }
        ]
    }
});
    
a.draw();
a.on('mousedown', function (e,[x,y]) {

    this.add('point', {
        data: [
            this.scaleX.invert(x),
            this.scaleY.invert(y)
        ]
    })
   
})

a.on('touchstart', function (e,[x,y]) {

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
        <option value="0">启用缩放</option>
        <option value="1">禁止缩放</option>
    </select>
</div>
`
$('body').append(box)
$('#limit').on('change',function(){

    a.setMode(this.value == '1' ? 'add' : 'move');
})

a.on('a',function(e){
    console.log(e)
    return false
})
console.log(a.emit('a'))