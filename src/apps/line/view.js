import Marionette from 'backbone.marionette'
import _ from 'lodash'
import * as d3 from 'd3'

const LineView = Marionette.ItemView.extend({
  template: _.template("<svg></svg>"),
  className: "graph--line",
  ui: {
    canvas: 'svg'
  },
  onShow: function() {
    this.setCanvasSize()
    this.graph = this.setGraphAttributes()
    this.renderGraph()
    console.log(this)
  },
  setCanvasSize: function() {
    this.ui.canvas[0].setAttribute('width', this.el.clientWidth)
    this.ui.canvas[0].setAttribute('height', this.el.clientHeight)
  },
  setGraphAttributes: function () {
    const data = _.map(this.model.toJSON())
    const margin = {
      top: 20,
      right: 20,
      bottom: 20,
      left: 20
    }
    const width = this.el.clientWidth
    const height = this.el.clientHeight
    const yScale = d3.scaleLinear().domain([0, d3.max(data)]).range([0, (height - margin.top - margin.bottom)])
    const xScale = d3.scaleLinear().domain([0, data.length - 1]).range([0, (width - margin.left - margin.right)])
    return { data, width, height, margin, yScale, xScale }
  },
  renderGraph: function () {
    const { data, xScale, yScale } = this.graph

    const line = d3.line()
      .x((d, i) => xScale(i))
      .y(d => this.graph.height - yScale(d))

    const xAxis = d3.axisBottom().scale(xScale).ticks(data.length)
    console.log(xAxis)

    const chart = d3.select(this.ui.canvas[0]).append('g')
      .append('path')
      .call(xAxis)
      .attr('d', line(data))
      .style('stroke', 'grey')
      .style('fill', 'none')
  }
})

export default LineView
