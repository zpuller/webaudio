var grid = { dimension: 8 };
var grid_keys = ['a','s','d','f','g','h','j','k'];
var active_tiles = [];
for (var i = 0; i < grid.dimension; ++i)
{
  active_tiles[i] = [];
  for (var j = 0; j < grid.dimension; ++j)
  {
    active_tiles[i][j] = false;
  }
}

function handle_click(event)
{
  var x = Math.floor(canvas.width * (event.offsetX / canvas.clientWidth));
  var y = Math.floor(canvas.height * (event.offsetY / canvas.clientHeight));
  if (x < grid.x || y < grid.y
      || x > (grid.x + grid.width)
      || y > (grid.y + grid.height))
    return;
  var width = grid.width / grid.dimension;
  var height = grid.height / grid.dimension;
  var tile = {};
  tile.x = Math.floor((x - grid.x) / width);
  tile.y = Math.floor((y - grid.y) / height);
  
  if (!active_tiles[tile.y][tile.x])
  {
    active_tiles[tile.y][tile.x] = true;
    fill_tile(tile, green);
  }
  else
  {
    active_tiles[tile.y][tile.x] = false;
    fill_tile(tile, red);
  }
}

function play_beat(beat)
{
  for (var i = 0; i < grid.dimension; ++i)
  {
    if (active_tiles[i][beat])
    {
      play_sound(buffers[i+1], 0);
    }
  }
}

var beat = 0;
function tick()
{
  beat = (beat + 1) % 8;
  play_beat(beat);
}

setInterval(tick, 1000 / 2);
window.addEventListener('mousedown', handle_click);
