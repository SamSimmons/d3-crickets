const LineView = Marionette.ItemView.extend({
  template: "./templates/line",
  modelEvents: {
    change: "render"
  },
  className: "graph--line",
  onShow: () => {
    console.log("showing line graph")
  }
})

export default LineView
