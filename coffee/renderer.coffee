class Renderer
  constructor: (@map, @canvas) ->
    @context = @canvas.getContext '2d'
    @offset = {
      x: 0
      y: 0
    }

  drawMap: (highlight) ->
    @context.fillStyle = 'gray'
    @context.fillRect 0,0, @canvas.width, @canvas.height

    for x in [0...32]
      for y in [0...32]
        tile = @map.getTile {x: x, y: y}
        if highlight? && highlight.x == x && highlight.y == y
          tc = document.createElement 'canvas'
          [tc.width, tc.height] = [tile.width, tile.height]
          ctx = tc.getContext '2d'
          ctx.drawImage tile, 0 ,0
          imgd = ctx.getImageData 0, 0, tc.width, tc.height
          pixels = imgd.data
          for i in [0...pixels.length] by 4
            pixels[i] = 200

          ctx.putImageData imgd,0,0
          tile = tc
        @context.drawImage tile, @offset.x + (x * tile.width / 2) - (tile.width / 2 * y), @offset.y + (x * tile.width / 4) + (y * tile.width / 4)

  setOffset: (offset) ->
    @offset = offset
    
