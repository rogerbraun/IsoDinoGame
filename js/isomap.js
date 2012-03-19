var IsoMap;

IsoMap = (function() {

  function IsoMap(width, height) {
    this.width = width;
    this.height = height;
    this.arr = [];
  }

  IsoMap.prototype.setTile = function(pos, tile) {
    return this.arr[pos.x + this.width * pos.y] = tile;
  };

  IsoMap.prototype.getTile = function(pos) {
    return this.arr[pos.x + this.width * pos.y];
  };

  return IsoMap;

})();
