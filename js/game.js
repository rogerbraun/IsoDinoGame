
new Loader(['images/tile_forest01.png', 'images/tile_water.png', 'images/tile_grass.png', 'images/tile_forest02.png', 'images/tile_forest03.png', 'images/tile_forest04.png'], function() {
  var absToIso, canvas, context, currentPos, dragging, map, offset, renderer, temp, x, y;
  canvas = document.createElement('canvas');
  document.body.appendChild(canvas);
  canvas.width = document.body.clientWidth;
  canvas.height = document.body.clientHeight;
  offset = {
    x: 0,
    y: 0
  };
  dragging = false;
  currentPos = false;
  context = canvas.getContext('2d');
  Tiles.add('forest1', 'images/tile_forest01.png');
  Tiles.add('forest2', 'images/tile_forest02.png');
  Tiles.add('forest3', 'images/tile_forest03.png');
  Tiles.add('forest4', 'images/tile_forest04.png');
  Tiles.add('grass', 'images/tile_grass.png');
  Tiles.add('water', 'images/tile_water.png');
  map = new IsoMap(32, 32);
  for (x = 0; x < 32; x++) {
    for (y = 0; y < 32; y++) {
      temp = Math.floor(Math.random() * Tiles.count);
      map.setTile({
        x: x,
        y: y
      }, Tiles.arr[temp]);
    }
  }
  renderer = new Renderer(map, canvas);
  renderer.drawMap();
  canvas.onmousedown = function(event) {
    dragging = true;
    return currentPos = {
      x: event.clientX,
      y: event.clientY
    };
  };
  canvas.onmouseup = function(event) {
    dragging = false;
    return currentPos = false;
  };
  canvas.onmousemove = function(event) {
    var delta, pos;
    if (dragging) {
      delta = {
        x: event.clientX - currentPos.x,
        y: event.clientY - currentPos.y
      };
      currentPos = {
        x: event.clientX,
        y: event.clientY
      };
      offset = {
        x: offset.x + delta.x,
        y: offset.y + delta.y
      };
      renderer.setOffset(offset);
      return renderer.drawMap();
    } else {
      pos = absToIso(event, offset);
      return renderer.drawMap(pos);
    }
  };
  return absToIso = function(event, offset) {
    var col, res, row;
    x = event.x - offset.x;
    y = event.y - offset.y;
    y -= 260;
    col = y * 2;
    col = (col - x) / 2;
    row = x + col - 140;
    col = Math.round(col / 140);
    row = Math.round(row / 140);
    res = {
      x: row,
      y: col
    };
    return res;
  };
});
