Tiles = {
  count: 0
  arr: []
  by_name: {}
  add: (key, str) ->
    img = new Image
    img.src = str
    this.arr.push img
    this.by_name[key] = img
    this.count++
}
