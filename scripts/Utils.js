!function (ctx) {

  var Utils = ctx.Utils = {

    getRandomInt: function (num) {
      return Math.floor(Math.random() * num)
    },

    getRandomItem: function (arr) {
      return arr[Utils.getRandomInt(arr.length)]
    }

  }

}(window);