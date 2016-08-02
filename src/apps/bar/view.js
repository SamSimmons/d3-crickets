import Marionette from 'backbone.marionette'
import _ from 'lodash'
import * as d3 from 'd3'

const BarView = Marionette.ItemView.extend({
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
    const yScale = d3.scaleLinear().range([height - margin.top - margin.bottom, 0]).domain([0, d3.max(data)])
    const xScale = d3.scaleBand()
      .domain(data)
      .rangeRound([0, width - margin.left - margin.right])
      .paddingInner(0.2)

    return { data, width, height, margin, xScale, yScale }
  },
  renderGraph: function () {
    const { data, width, height, margin, xScale, yScale } = this.graph

    const xAxisScale = d3.scaleBand().domain(data.map((x, i) => i + 1)).rangeRound([0, width - margin.left - margin.right]).paddingInner(0.2)
    const xAxis = d3.axisBottom().scale(xAxisScale)
    const yAxis = d3.axisLeft().scale(yScale)

    const chart = d3.select(this.ui.canvas[0]).append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)

    const bar = chart.selectAll('g')
        .data(data)
      .enter().append('g')
        .attr('transform', d => `translate(${xScale(d)}, 0)`)

    bar.append('rect')
      .attr('y', d => yScale(d))
      .attr('height', d => height - margin.bottom - margin.top - yScale(d))
      .attr('width', xScale.bandwidth())
      .style('fill', 'steelblue')

    chart.append('g')
      .attr('transform', `translate(0, ${height - margin.top - margin.bottom})`)
      .call(xAxis)

    chart.append('g')
      .attr('transform', `translate(0, ${margin.top - margin.bottom})`)
      .call(yAxis)

  }
})

export default BarView
