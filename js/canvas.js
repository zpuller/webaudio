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
  var x = grid.x + (grid.width * tile.x / grid.dimensions.x);
  var y = grid.y + (grid.height * tile.y / grid.dimensions.y);
  var width = grid.width / grid.dimensions.x;
  var height = grid.height / grid.dimensions.y;

  var ctx = canvas.getContext('2d');
  ctx.drawImage(img, x, y, width, height); 
}
