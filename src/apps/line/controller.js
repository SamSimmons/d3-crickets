import Marionette from 'backbone.marionette'

import LineView from './view'

const Line = Marionette.Object.extend({
  initialize: (options) => {
    view = new LineView()
    console.log(view)
  },
  getView: () => new LineView()
})

export default Line
