import Marionette from 'backbone.marionette'

const Line = Marionette.Object.extend({
  initialize: (options) => {
    const view = require('./view')
    console.log('view', view)
  }
})

export default Line
