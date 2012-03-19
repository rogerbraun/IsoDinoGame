class IsoMap
  constructor: (width, height) ->
    @width = width
    @height = height
    @arr = []
  
  setTile: (pos, tile) ->
    @arr[pos.x + @width * pos.y] = tile
    
  getTile: (pos) ->
    @arr[pos.x + @width * pos.y]
