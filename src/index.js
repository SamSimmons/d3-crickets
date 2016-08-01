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

import lineView from './apps/line/view'
const view = new lineView({model: dataModel})
app.mainRegion.show(view)

app.start()
