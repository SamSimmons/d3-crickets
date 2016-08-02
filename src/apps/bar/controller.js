import Marionette from 'backbone.marionette'

import BarView from './view'

const Bar = Marionette.Object.extend({
  initialize: (options) => {
    view = new BarView()
  },
  getView: () => new BarView()
})

export default Bar
