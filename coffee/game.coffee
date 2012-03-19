new Loader(['images/tile_forest01.png','images/tile_water.png','images/tile_grass.png','images/tile_forest02.png','images/tile_forest03.png','images/tile_forest04.png'], () ->
  # Canvas 
  canvas = document.createElement 'canvas'
  document.body.appendChild canvas
  canvas.width = document.body.clientWidth
  canvas.height = document.body.clientHeight

  offset = {
    x: 0
    y: 0
  }

  dragging = false
  currentPos = false

  context = canvas.getContext '2d'

  Tiles.add 'forest1', 'images/tile_forest01.png'
  Tiles.add 'forest2', 'images/tile_forest02.png'
  Tiles.add 'forest3', 'images/tile_forest03.png'
  Tiles.add 'forest4', 'images/tile_forest04.png'
  Tiles.add 'grass', 'images/tile_grass.png'
  Tiles.add 'water', 'images/tile_water.png'

  map = new IsoMap(32, 32)

  for x in [0...32]
    for y in [0...32]
      temp = Math.floor((Math.random() * Tiles.count))
      map.setTile({x: x, y:y}, Tiles.arr[temp])
  
  renderer = new Renderer(map, canvas)
  renderer.drawMap()

  canvas.onmousedown = (event) ->
    dragging = true
    currentPos = {
      x: event.clientX
      y: event.clientY
    }

  canvas.onmouseup = (event) ->
    dragging = false
    currentPos = false

  canvas.onmousemove = (event) ->
    if dragging
      delta = {
        x: event.clientX - currentPos.x
        y: event.clientY - currentPos.y
      }
      currentPos = {
        x: event.clientX
        y: event.clientY
      }
      offset = {
        x: offset.x + delta.x
        y: offset.y + delta.y
      }
      renderer.setOffset(offset)
      renderer.drawMap()
    else
      pos = absToIso(event, offset)
      renderer.drawMap(pos)

  absToIso = (event, offset) ->
    # Magic
    x = event.x - offset.x
    y = event.y - offset.y
    y -= 260
    col = y * 2
    col = (col - x) / 2
    row = x + col - 140
    col = Math.round(col / 140)
    row = Math.round(row / 140)

    res = {
      x: row
      y: col
    }
    res
     

)
