import events from 'events';
import util from "../../util.js";

const gClassName = 'shape';
class Base extends events {

    constructor(chart, config) {

        super()
        this.setMaxListeners(0);

        this.chart = chart;
        this.isDrew = false;
        this.id = config.id ? config.id : ('shape-' + util.uniqueId());

        this.scaleX = chart.scaleX;
        this.scaleY = chart.scaleY;
        this.graph = chart.graph;
        this.width = chart.layout.w;
        this.height = chart.layout.h;

        this.relations = [];
        var that = this;

        //此处不使用bind 是为了取消事件
        // funA.bind(a) != funA.bind(a)
        this.drawCall = function() {
            return that.draw();
        }
        chart.on('draw', this.drawCall)


    }



    draw() {

        this.isDrew = true;
        this.emit('draw');

    }

    isContact(p) {
        return this.isHover;
    }

    focus() {
        this.group.classed(this.activeClassName, true);
    }

    blur() {
        this.group.classed(this.activeClassName, false);
    }

    buildDom() {
        this.group = this.graph
            .append('g')
            .attr('id', this.id)
            .attr('class', gClassName);
        var that = this;
        this.group
            .on('mouseover', function() {
                that.isHover = true;
                // console.log(this,true)
            })
            .on('mouseout', function() {
                that.isHover = false;
                // console.log(this,false)
            })

    }

    /**
     * 将客户端坐标转差值换为坐标系坐标差值
     */
    pxToUnit([dx, dy]) {
        var uxPerPx = this.scaleX(1) - this.scaleX(0);// px/unit
        var uyPerPx = this.scaleY(1) - this.scaleY(0);

        return [dx / uxPerPx, dy / uyPerPx];
    }

    get proxyClassName() {
        return 'proxy';
    }

    get activeClassName() {
        return 'active';
    }
    get proxyPathWidth() {
        return 8;
    }

    addRelation(relation) {
        this.relations.push(relation);
    }
    
    removeRelation(r){
        var i = this.relations.indexOf(r);
        if(i > -1){
            this.relations.splice(i,1);
        }
    }

    destroy() {

        this.group.remove();
        this.relations.forEach(r => {
            r.destroy();
        });
        this.relations = null;
        this.chart.removeListener('draw', this.drawCall);
        this.chart.removeShapeRef(this);
        

    }
}

export default Base;