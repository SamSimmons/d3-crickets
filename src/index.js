import * as d3 from 'd3'
import Backbone from 'backbone'
import Marionette from 'backbone.marionette'
import $ from 'jquery'
import _ from 'lodash'

import Line from './apps/line/controller'

const app = new Marionette.Application()
app.on('start', () => {
  console.log('app started')
  Backbone.history.start()
})

app.start()
