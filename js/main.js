audio_ctx = new (window.AudioContext || window.webkitAudioContext)();

var buffers = {};
var active_buffers = [];
var samples_dir = [location.origin,'/samples/'].join('');
var paths = {};
file_names.forEach(function(fn) {
  paths[fn] = [samples_dir, fn].join(''); 
})

var sequencer = new Sequencer(audio_ctx);
sequencer.width = 1080;
sequencer.height = 768;
sequencer.color = black;

var grid = {};
grid.dimensions = { x: 8, y: 8 };
for (var i = 0; i < grid.dimensions.y; ++i)
{
  sequencer.active_tiles[i] = [];
  for (var j = 0; j < grid.dimensions.x; ++j)
  {
    sequencer.active_tiles[i][j] = false;
  }
}

var tile_img = new Image();
tile_img.src = "tile.png";

grid.x = (canvas.width - sequencer.width)/2; 
grid.y = (canvas.height - sequencer.height)/2 + 60;
grid.width = sequencer.width;
grid.height = sequencer.height - 120;

var tempo_elem = document.getElementById('tempo');
var tempo = 120;
tempo_elem.innerText = [tempo, " bpm"].join('');
var play = setInterval(sequencer.tick.bind(sequencer), 1000 * 60 / tempo);

function change_tempo(tempo)
{
  window.clearInterval(play);
  play = setInterval(sequencer.tick.bind(sequencer), 1000 * 60 / tempo);
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

function set_default_active_buffers()
{
  file_names.forEach(add_sound_assignment_gen(sequencer));
}

load_sounds(audio_ctx, buffers, paths, set_default_active_buffers); 
window.addEventListener('click', sequencer.handle_click.bind(sequencer));

render(sequencer);
