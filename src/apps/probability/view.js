import Marionette from 'backbone.marionette'
import _ from 'lodash'
import * as d3 from 'd3'

const ProbabilityView = Marionette.ItemView.extend({
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
    const xScale = d3.scaleLinear().domain([-100, 100]).range([0, width - margin.left - margin.right])

    return { data, width, height, margin, xScale }
  },
  renderGraph: function () {
    const { data, width, height, margin, xScale } = this.graph
    console.log(xScale(-50))

    const chart = d3.select(this.ui.canvas[0])
  }
})

export default ProbabilityView
