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

var tempo_elem = document.getElementById('tempo');
var tempo = 120;
tempo_elem.innerText = [tempo, " bpm"].join('');
var play = setInterval(tick, 1000 * 60 / tempo);
function change_tempo(tempo)
{
  window.clearInterval(play);
  play = setInterval(tick, 1000 * 60 / tempo);
  tempo_elem.innerText = [tempo, " bpm"].join('');
}

var tempo_mouse;
tempo_elem.addEventListener('mousedown', start_scroll_tempo) 
function start_scroll_tempo(event)
{
  tempo_mouse = event.pageY;
  window.addEventListener('mousemove', scroll_tempo); 
  window.addEventListener('mouseup', stop_scroll_tempo); 
}
function stop_scroll_tempo()
{
  window.removeEventListener('mousemove', scroll_tempo); 
  window.removeEventListener('mouseup', stop_scroll_tempo); 
}
function scroll_tempo()
{
  var diff = event.pageY - tempo_mouse;
  if (tempo - diff > 0)
  {
    tempo -= diff;
    tempo_mouse = event.pageY;
    change_tempo(tempo);
  }
}

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
