import events from 'events';
import Chart from '../index.js';
class Base extends events {

    constructor(chart) {

        super()

        if(!(chart instanceof  Chart)){

            throw new Error('图样的构造需传入Chart作为参数')
        }

        this.chart = chart;
        this.isDrew =false;
        this.id ='pattern' + new Date().getTime();

        this.scaleX = chart.scaleX;
        this.scaleY = chart.scaleY;
        this.graph  = chart.graph;
        this.width = chart.layout.w;
        this.height = chart.layout.h;

        chart.on('draw',this.draw.bind(this))


    }

    draw(){
        this.isDrew = true;
    }

    isContact(p){
        return false;
    }

    focus(){
        //this.dom.attr('fill','red')
    }

    blur(){
       // this.dom.attr('fill',this.color)
    }
}

export default Base;