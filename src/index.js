import * as d3 from 'd3'
import Backbone from 'backbone'
import Marionette from 'backbone.marionette'
import $ from 'jquery'
import _ from 'lodash'

import './style/index.scss'

const app = new Marionette.Application()

app.addRegions({
  mainRegion: '.main'
})

const fakeData = [5, 12, 6, 3, 2, 9]
const dataModel = new Backbone.Model(fakeData)

import LineView from './apps/line/view'
import BarView from './apps/bar/view'
import ProbabilityView from './apps/probability/view'

// const view = new LineView({model: dataModel})
// const view = new BarView({model: dataModel})
const view = new ProbabilityView({model: dataModel})

app.mainRegion.show(view)

app.start()
