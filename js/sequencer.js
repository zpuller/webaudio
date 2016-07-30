function Sequencer(audio_ctx)
{
  this.audio_ctx = audio_ctx;
  this.active_tiles = new Array();
  this.active_row = 0;
  this.beat = 0;
}

Sequencer.prototype.handle_click = function(event) {
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
  
  if (!this.active_tiles[tile.y][tile.x])
  {
    this.active_tiles[tile.y][tile.x] = true;
  }
  else
  {
    this.active_tiles[tile.y][tile.x] = false;
  }

  this.active_row = tile.y;
  render(this);
};

Sequencer.prototype.play_beat = function(beat) {
  for (var i = 0; i < grid.dimensions.y; ++i)
  {
    if (this.active_tiles[i][beat])
    {
      play_sound(this.audio_ctx, active_buffers[i], 0);
    }
  }
  offset = 10; 
  render(this, offset);
  offset = 0; 
  setTimeout(function() { render(this, offset) }.bind(this), 80);
};

Sequencer.prototype.tick = function() {
  this.beat = (this.beat + 1) % 8;
  if (!this.beat)
    flip_colors();

  this.play_beat(this.beat);
};
