import events from 'events';
import util from "../util.js";

const gClassName = 'shape';
class Base extends events {

    constructor(chart) {

        super()
        this.setMaxListeners(0);
       
        this.chart = chart;
        this.isDrew = false;
        this.id = 'shape-' + util.uniqueId();

        this.scaleX = chart.scaleX;
        this.scaleY = chart.scaleY;
        this.graph = chart.graph;
        this.width = chart.layout.w;
        this.height = chart.layout.h;

        chart.on('draw', this.draw.bind(this))


    }

    draw() {
        this.isDrew = true;
        this.emit('drew');
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
            .attr('class',gClassName);
        var that = this;
        this.group
        .on('mouseover',function () {
            that.isHover  =true;
           // console.log(this,true)
        })
        .on('mouseout',function () {
            that.isHover  =false;
            // console.log(this,false)
        })
        
    }
    
    /**
     * 将客户端坐标转差值换为坐标系坐标差值
     */
    pxToUnit([dx,dy]){
        var uxPerPx = this.scaleX(1) - this.scaleX(0);// px/unit
        var uyPerPx = this.scaleY(1) - this.scaleY(0);
        
        return [dx/uxPerPx,dy/uyPerPx];
    }
    
    get proxyClassName(){
        return 'proxy';
    }
    
    get activeClassName(){
        return 'active';
    }
    get proxyPathWidth(){
        return 8;
    }
}

export default Base;