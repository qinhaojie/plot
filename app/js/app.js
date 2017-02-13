import Chart from './chart/index.js';

var a = new Chart({
    container: document.getElementById('app'),
    xAxes: {
        domain: [-20.50, 20.50]
    },
    yAxes: {
        domain: [-2, 2]
    },
    content: {
        
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

a.draw();


var box = `
    <div id="box">
    选择模式
    <select name="a" id="limit">
        <option value="move">移动与缩放</option>
        <option value="relation.verticalLine">垂线</option>
        <option value="relation.parallelLine">平行线</option>
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

