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

function render()
{
  var ctx = canvas.getContext('2d');
  
  ctx.drawImage(img, (canvas.width - img.width)/2, (canvas.height - img.height)/2, img.width, img.height);
  grid.x = (canvas.width - img.width)/2 + 60;
  grid.y = (canvas.height - img.height)/2 + 60;
  grid.width = img.width - 120;
  grid.height = img.height - 120;
  draw_rectangle(grid.x, grid.y, grid.width, grid.height, grey)
}

function fill_tile(tile, color)
{
  var x = grid.x + (grid.width * tile.x / grid.dimension);
  var y = grid.y + (grid.height * tile.y / grid.dimension);
  var width = grid.width / grid.dimension;
  var height = grid.height / grid.dimension;
  draw_rectangle(x, y, width, height, color);
}

var img = new Image();

draw_canvas_background();

img.src = "sequencer.png";
img.onload = render;
