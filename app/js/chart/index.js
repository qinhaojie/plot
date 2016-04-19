import events from 'events';
import * as shape from './shape/index.js';
import RelationManager from './manager/managers/relationManager.js';
var isPc = document.body.ontouchstart === undefined;
var event = {
    down: isPc ? 'mousedown' : 'touchstart',
    move: isPc ? 'mousemove' : 'touchmove',
    up: isPc ? 'mouseup' : 'touchend'
}
class Chart extends events {

    constructor({
        container = document.body,
        xAxes = {
            domain: [-10, 10]
        },
        yAxes = {
            domain: [-5, 5]
        },
        /**
         * content = {
         *  straight:[
         *      {
         *          data:[p0,p1],
         *          color:String,
         *          id:String    
         *      }
         *  ]  
         * }
         */
        content = {},

    } = {},
        //操作模式
        mode = 'move') {

        super();

        this.container = container;
        var margin = {
            top: 20,
            right: 40,
            bottom: 20,
            left: 40
        },
            width = container.clientWidth - margin.left - margin.right,
            height = container.clientHeight - margin.top - margin.bottom;
        this.layout = {
            w: width,
            h: height,
            margin: margin
        }

        this.scaleX = d3.scale.linear()
            .domain(xAxes.domain)
            .range([0, width]);
        this.scaleY = d3.scale.linear()
            .domain(yAxes.domain)
            .range([height, 0])

        this.limitZoom = false;

        this.mode = mode;

        //取消对监听器数量的限制
        this.setMaxListeners(0);
        
         /**
         * 形状的索引
         * 键值为形状id
         */
        this.shapeMap = {};
        
        this.init();
        this.relationManager = new RelationManager(this);
        this.translateContent(content);
        
       
    }

    //初始化画布
    init() {
        var margin = this.layout.margin
        var width = this.layout.w;
        var height = this.layout.h;
        var svg = d3.select(this.container).append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)

        var canvas = svg.append("g")
            .attr('class', 'canvas')
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        canvas.append("defs").append("clipPath")
            .attr("id", "clip")
            .append("rect")
            .attr("width", width)
            .attr("height", height);


        this.svg = svg;
        this.canvas = canvas;

        this.buildAxes();
        this.buildAuxline();
        this.graph = canvas.append('g')
            .attr('class', 'graph')
            .attr("clip-path", "url(#clip)");
        this.bindEvent();

    }

    translateContent(content) {
        this.content = {};
        Object.keys(content).forEach((name, i) => {

            // this.content[name] = content[name].map(item => {
            //     return new shape[name](this, item);
            // });
            content[name].forEach((config)=>{
                this._add(name,config);
            })
        })
        window.c = this.content;


    }

    buildAxes() {
        var x = this.scaleX;
        var y = this.scaleY;
        this.axesX = this.canvas.append("g")
            .attr("class", "x-axes axes")
            .attr("transform", "translate(0," + this.layout.h + ")")
            .call(d3.svg.axis().scale(x).orient("bottom"));
        this.axesY = this.canvas.append("g")
            .attr("class", "y-axes axes")
            .call(d3.svg.axis().scale(y).orient("left"));
    }

    //网格线
    buildAuxline() {
        var x = this.scaleX.ticks();
        var y = this.scaleY.ticks();
        if (!this.auxLines) {
            this.auxLines = this.canvas.append('g')
                .attr('class', 'aux-line');


        }
        var that = this;
        var updateX = this.auxLines
            .selectAll('.aux-line-x')
            .data(x)
        updateX.enter()
            .append('line')
            .attr('class', 'aux-line-x')
        updateX.exit().remove()
        var updateY = this.auxLines
            .selectAll('.aux-line-y')
            .data(y)
        updateY.enter()
            .append('line')
            .attr('class', 'aux-line-y')
        updateY.exit().remove();

        this.auxLines
            .selectAll('.aux-line-x')
            .attr('x1', (d, i) => {
                return that.scaleX(d)
            })
            .attr('x2', (d, i) => {
                return that.scaleX(d)
            })
            .attr('y1', that.layout.h)
            .attr('y2', 0)
            .attr('value', function(d) {
                return d;
            })


        this.auxLines
            .selectAll('.aux-line-y')
            .attr('y1', (d, i) => {
                return that.scaleY(d)
            })
            
            .attr('y2', (d, i) => {
                return that.scaleY(d)
            })
            .attr('x1', that.layout.w)
            .attr('x2', 0)
            .attr('value', function(d) {
                return d;
            })


    }

    reBuildAxes() {
        this.axesX.call(
            d3.svg.axis().scale(this.scaleX).orient("bottom")
        );
        this.axesY.call(
            d3.svg.axis().scale(this.scaleY).orient("left")
        )
    }

    bindEvent() {
        var zoom = this.zoom = d3.behavior.zoom();
        this.zoom = zoom;
        var that = this;
        var tempScale = d3.scale.linear()
        zoom.x(this.scaleX)
            .y(this.scaleY)

            .on('zoom', function() {

                if (that.mode != 'move') {
                    //zoom.x(tempScale).y(tempScale)

                } else {
                    //  zoom.x(that.scaleX).y(that.scaleY);
                    that.reBuildAxes();
                    that.draw();
                    that.buildAuxline();
                }

            })

        this.rect = this.graph.append('rect')
            .attr('x', 0)
            .attr('y', 0)
            .attr('width', this.layout.w)
            .attr('height', this.layout.h)
            .attr('fill', 'none')
            .attr('style', 'pointer-events: all;')
            .call(zoom)


        for (let e of Object.keys(event)) {

            d3.select(this.container).on(event[e], function() {

                let controller = {
                    emit: true
                }
                //先触发内部绑定的事件
                that.emit('_' + event[e], controller);
                //内部事件对参数的赋值控制是否触发外部事件
                if (controller.emit == false) return;

                d3.event.preventDefault();
                that.emit(event[e], d3.event, that.getMouse());


            })
        }


        this.on('_' + event.down, function(ctrl) {
            this.lastTarget = this.focusTarget;
            this.focusTarget = this.activeTarget;
            this.dragStart = false;
            this.dragStartPoint = this.getMouse();
            if (this.mode.indexOf('relation') < 0) {

                this.lastTarget && this.lastTarget.blur()
            }

            //选择到一个目标时候禁止缩放
            if (this.mode == 'move' && this.focusTarget) {
                this.setMode('_move');
                this.dragStart = true;
            }
            if (this.focusTarget) {
                ctrl.emit = false;
                // this.focusTarget.focus();
                this.emit('choose', this.focusTarget)
            }
        })

        this.on('_' + event.move, function(ctrl) {
          
            if (!this.dragStart) {
                var target = this.getSelect(this.getMouse());

                //关系模式
                if (this.mode.indexOf('relation') > -1) {

                    if (!target && this.activeTarget) {
                        this.emit('hoverout', this.activeTarget);
                        this.activeTarget = null;
                    } else if (target && target != this.activeTarget) {
                        this.activeTarget && this.emit('hoverout', this.activeTarget);
                        this.emit('hover', target);
                        this.activeTarget = target;
                    } else {
                        this.activeTarget = target;
                        target && this.emit('hover', target);
                    }

                } else {
                    if (target && target !== this.activeTarget) {
                        this.activeTarget && this.activeTarget.blur();
                        target.focus();
                        this.activeTarget = target;
                    }
                    if (!target && this.activeTarget) {
                        this.activeTarget.blur();
                        this.activeTarget = null;
                    }

                }
            }


            if (this.focusTarget && this.mode == '_move') {
                this.focusTarget.focus();
                this.dragStart && this.emit('dragtarget', this.focusTarget)
            }


        });

        this.on('_' + event.up, function(ctrl) {


            this.dragStart && this.emit('dragtargetend', this.focusTarget);
            this.dragStart = false;
            if (this.mode == '_move') {
                this.setMode('move');
            }

        });

        this.on('dragtarget', function(target) {
            var c = this.getMouse();
            var [x, y] = this.dragStartPoint;
            target.move([c[0] - x, c[1] - y])
        });

        this.on('dragtargetend', function(target) {
            if (target) {
                target.moveEnd();
            }
        })

    }

    /**
     * 获取该位置所存在的图样
     * @param px
     * @param py
     */
    getSelect([px, py]) {
        for (let shapes of Object.keys(this.content)) {

            for (let p of this.content[shapes]) {
                if (p.isContact([px, py])) {
                    return p;
                }
            }

        }
        return null;
    }

    draw() {


        this.emit('draw');
    }

    setMode(mode) {

        if (mode == 'move') {
            this.zoom.x(this.scaleX).y(this.scaleY);
        } else {
            this.zoom.x(d3.scale.linear()).y(d3.scale.linear());
        }
        this.mode = mode;
        if (mode != '_move') {
            this.blurAll();
        }
        this.emit('modechange', mode);
    }

    add(type, config) {
        if (this.mode != 'add') return;
        var ret = this._add(type, config);
        this.lastTarget && this.lastTarget.blur();
        this.activeTarget = this.focusTarget = ret;
        ret.focus();
       
        return ret;

    }

    _add(type, config) {
        if (!this.content[type]) {
            this.content[type] = [];
        }
        var n = new shape[type](this, config, true)
        this.content[type].push(n);
        this.shapeMap[n.id] = n;
        return n;
    }

    getMouse() {
        return d3.mouse(this.graph[0][0]);
    }

    blurAll() {
        Object.keys(this.content).forEach(name => {
            this.content[name].forEach(shape => {
                shape.blur()
            })
        });
        this.activeTarget = this.focusTarget = this.lastTarget = null;
    }
    
    removeShape(shape){
        shape.destroy();
    }
    
    removeShapeRef(shape){
        var name = shape.name;
        var i = this.content[name].indexOf(shape);
        if(i>-1){
            this.content[name].splice(i,1);
            delete this.shapeMap[shape.id]
        }
    }
}

export default Chart;