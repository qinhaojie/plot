import events from 'events';
import Chart from '../index.js';
import util from "../util.js";

class Base extends events {

    constructor(chart) {

        super()

        if (!(chart instanceof Chart)) {

            throw new Error('图样的构造需传入Chart作为参数')
        }

        this.chart = chart;
        this.isDrew = false;
        this.id = 'pattern-' + util.uniqueId();

        this.scaleX = chart.scaleX;
        this.scaleY = chart.scaleY;
        this.graph = chart.graph;
        this.width = chart.layout.w;
        this.height = chart.layout.h;

        chart.on('draw', this.draw.bind(this))


    }

    draw() {
        this.isDrew = true;
    }

    isContact(p) {
        return false;
    }

    focus() {
        this.dom.classed('active', true)
    }

    blur() {
        this.dom.attr('active', false)
    }

    buildDom() {
        this.group = this.graph
            .append('g')
            .attr('id', this.id)
    }
}

export default Base;