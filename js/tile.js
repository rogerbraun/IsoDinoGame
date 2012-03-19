var Tiles;

Tiles = {
  count: 0,
  arr: [],
  by_name: {},
  add: function(key, str) {
    var img;
    img = new Image;
    img.src = str;
    this.arr.push(img);
    this.by_name[key] = img;
    return this.count++;
  }
};
