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
    this.graph = this.getAttributes()
    this.renderGraph(this.graph)
  },
  setCanvasSize: function() {
    this.ui.canvas[0].setAttribute('width', this.el.clientWidth)
    this.ui.canvas[0].setAttribute('height', this.el.clientHeight)
  },
  getAttributes: function () {
    const data = _.map(this.model.toJSON())
    const margin = {
      top: 20,
      right: 20,
      bottom: 20,
      left: 20
    }
    const width = this.el.clientWidth
    const height = this.el.clientHeight
    const xScale = d3.scaleLinear().domain([0, data.length - 1]).range([0, (width - margin.left - margin.right)])
    const yScale = d3.scaleLinear().domain([d3.max(data), 0]).range([0, (height - margin.top - margin.bottom)])
    return { data, width, height, margin, yScale, xScale }
  },
  renderGraph: function () {
    const { data, width, height, margin, yScale, xScale } = this.graph

    const line = d3.line()
      .x((d, i) => xScale(i))
      .y(d => yScale(d))

    const xAxis = d3.axisBottom().scale(xScale).ticks(data.length)
    const yAxis = d3.axisLeft().scale(yScale)

    const chart = d3.select(this.ui.canvas[0])
    chart.append('g')
      .attr('transform', `translate(${ margin.left }, ${margin.top})`)
      .append('path')
      .attr('d', line(data))
      .style('stroke', 'grey')
      .style('fill', 'none')

    chart.append('g')
      .attr('transform', `translate(${margin.left}, ${height - margin.bottom})`)
      .call(xAxis)

    chart.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)
      .call(yAxis)

  }
})

export default LineView
