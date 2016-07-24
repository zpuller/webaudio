var grid_keys = ['a','s','d','f','g','h','j','k'];
var active_tiles = [];
var active_row = 0;

function handle_click(event)
{
  var x = Math.floor(canvas.width * (event.offsetX / canvas.clientWidth));
  var y = Math.floor(canvas.height * (event.offsetY / canvas.clientHeight));
  if (x < grid.x || y < grid.y
      || x > (grid.x + grid.width)
      || y > (grid.y + grid.height))
    return;
  var width = grid.width / grid.dimensions.x;
  var height = grid.height / grid.dimensions.y;
  var tile = {};
  tile.x = Math.floor((x - grid.x) / width);
  tile.y = Math.floor((y - grid.y) / height);
  
  if (!active_tiles[tile.y][tile.x])
  {
    active_tiles[tile.y][tile.x] = true;
    fill_tile_img(tile, tile_img);
  }
  else
  {
    active_tiles[tile.y][tile.x] = false;
    fill_tile_color(tile, grey);
  }

  active_row = tile.y;
  draw_row_selection(active_row);
}

function play_beat(beat)
{
  for (var i = 0; i < grid.dimensions.y; ++i)
  {
    if (active_tiles[i][beat])
    {
      play_sound(active_buffers[i], 0);
    }
  }
}

var beat = 0;
function tick()
{
  beat = (beat + 1) % 8;
  play_beat(beat);
}
