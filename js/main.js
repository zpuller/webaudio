draw_canvas_background();

var grid = {};
grid.dimensions = { x: 8, y: 8 };
for (var i = 0; i < grid.dimensions.y; ++i)
{
  active_tiles[i] = [];
  for (var j = 0; j < grid.dimensions.x; ++j)
  {
    active_tiles[i][j] = false;
  }
}

setInterval(tick, 1000 / 2);
load_sounds(buffers, paths, set_default_active_buffers); 
window.addEventListener('click', handle_click);


var tile_img = new Image();
tile_img.src = "tile.png";

var sequencer_img = new Image();
sequencer_img.src = "sequencer.png";
sequencer_img.onload = init_grid;
function init_grid()
{
  grid.x = (canvas.width - sequencer_img.width)/2 + 60;
  grid.y = (canvas.height - sequencer_img.height)/2 + 60;
  grid.width = sequencer_img.width - 120;
  grid.height = sequencer_img.height - 120;

  var ctx = canvas.getContext('2d');
  
  ctx.drawImage(sequencer_img, (canvas.width - sequencer_img.width)/2, (canvas.height - sequencer_img.height)/2, sequencer_img.width, sequencer_img.height);
}
