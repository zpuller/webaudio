var canvas = document.getElementById('canvas');
canvas.width = 1920;
canvas.height = 1080;

var red = 'rgb(255, 0, 0)'
var green = 'rgb(0, 255, 0)'
var white = 'rgb(255, 255, 255)'
var black = 'rgb(0, 0, 0)'
var grey = 'rgb(80, 80, 80)'

function draw_rectangle(x, y, width, height, color)
{
  var ctx = canvas.getContext('2d');
  ctx.fillStyle = color; 
  ctx.fillRect (x, y, width, height);
}

function draw_canvas_background()
{
  var ctx = canvas.getContext('2d');
  ctx.fillStyle = white; 
  ctx.fillRect (0, 0, canvas.width, canvas.height);
}

function draw_play() {
  var ctx = canvas.getContext('2d');

  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(3*5 + 75, 50);
  ctx.lineTo(3*5 + 50, 75);
  ctx.lineTo(3*5 + 50, 25);
  ctx.lineTo(3*5 + 77, 52);
  ctx.stroke();
}

function fill_play(color) {
  var ctx = canvas.getContext('2d');

  ctx.beginPath();
  ctx.moveTo(3*5 + 75, 50);
  ctx.lineTo(3*5 + 50, 75);
  ctx.lineTo(3*5 + 50, 25);
  ctx.fillStyle = color; 
  ctx.fill();
}

function draw_record()
{
  var ctx = canvas.getContext('2d');
  
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(5 + 25, 50, 25, 0, 2*Math.PI);
  ctx.stroke();
}

function fill_record(color)
{
  var ctx = canvas.getContext('2d');
  
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(5 + 25, 50, 25 - 2, 0, 2*Math.PI);
  ctx.fillStyle = color;
  ctx.fill();
}

function fill_tile_color(tile, color)
{
  var x = grid.x + (grid.width * tile.x / grid.dimensions.x);
  var y = grid.y + (grid.height * tile.y / grid.dimensions.y);
  var width = grid.width / grid.dimensions.x;
  var height = grid.height / grid.dimensions.y;
  draw_rectangle(x, y, width, height, color);
}

function fill_tile_img(tile, img)
{
  console.log(tile);
  console.log(img);
  var x = grid.x + (grid.width * tile.x / grid.dimensions.x);
  var y = grid.y + (grid.height * tile.y / grid.dimensions.y);
  var width = grid.width / grid.dimensions.x;
  var height = grid.height / grid.dimensions.y;

  var ctx = canvas.getContext('2d');
  ctx.drawImage(img, x, y, width, height); 
}

function draw_tiles()
{
  for (var i = 0; i < grid.dimensions.y; ++i)
  {
    for (var j = 0; j < grid.dimensions.x; ++j)
    {
      if (active_tiles[i][j])
        fill_tile_img({ y: i, x: j }, tile_img);
    }
  }
}

function draw_outline(seq)
{
  var ctx = canvas.getContext('2d');
  ctx.lineWidth = 5;

  var x = (canvas.width - seq.width) / 2;
  var y = (canvas.height - seq.height) / 2;
  var width = seq.width;
  var height = seq.height;
  var c1 = 250;
  var c2 = 50;
  var c3 = 150;
  var c4 = 50;

  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.bezierCurveTo(x - c1, y + c2, x - c1, y + height - c2, x, y + height);
  ctx.bezierCurveTo(x + c3, y + height + c4, x + width - c3, y + height + c4, x + width, y + height);
  ctx.bezierCurveTo(x + width + c1, y + height - c2, x + width + c1, y + c2, x + width, y);
  ctx.bezierCurveTo(x + width - c3, y - c4, x + c3, y - c4, x+20, y+20);
  ctx.stroke();
}

function render(row)
{
  var x = grid.x - (2 * grid.width / grid.dimensions.x);
  var y = grid.y + (grid.height * row / grid.dimensions.y);
  var width = grid.width / grid.dimensions.x;
  var height = grid.height / grid.dimensions.y;

  draw_canvas_background();
  draw_outline(sequencer);
  draw_tiles();
  draw_rectangle(x, y, width, height, green);
}
