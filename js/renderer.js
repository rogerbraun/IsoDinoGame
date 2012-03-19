var Renderer;

Renderer = (function() {

  function Renderer(map, canvas) {
    this.map = map;
    this.canvas = canvas;
    this.context = this.canvas.getContext('2d');
    this.offset = {
      x: 0,
      y: 0
    };
  }

  Renderer.prototype.drawMap = function(highlight) {
    var ctx, i, imgd, pixels, tc, tile, x, y, _results;
    this.context.fillStyle = 'gray';
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    _results = [];
    for (x = 0; x < 32; x++) {
      _results.push((function() {
        var _ref, _ref2, _results2;
        _results2 = [];
        for (y = 0; y < 32; y++) {
          tile = this.map.getTile({
            x: x,
            y: y
          });
          if ((highlight != null) && highlight.x === x && highlight.y === y) {
            tc = document.createElement('canvas');
            _ref = [tile.width, tile.height], tc.width = _ref[0], tc.height = _ref[1];
            ctx = tc.getContext('2d');
            ctx.drawImage(tile, 0, 0);
            imgd = ctx.getImageData(0, 0, tc.width, tc.height);
            pixels = imgd.data;
            for (i = 0, _ref2 = pixels.length; i < _ref2; i += 4) {
              pixels[i] = 200;
            }
            ctx.putImageData(imgd, 0, 0);
            tile = tc;
          }
          _results2.push(this.context.drawImage(tile, this.offset.x + (x * tile.width / 2) - (tile.width / 2 * y), this.offset.y + (x * tile.width / 4) + (y * tile.width / 4)));
        }
        return _results2;
      }).call(this));
    }
    return _results;
  };

  Renderer.prototype.setOffset = function(offset) {
    return this.offset = offset;
  };

  return Renderer;

})();
