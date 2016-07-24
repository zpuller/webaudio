audio_ctx = new (window.AudioContext || window.webkitAudioContext)();

function BufferLoader(audio_ctx, urlList, callback)
{
  this.audio_ctx = audio_ctx;
  this.urlList = urlList;
  this.onload = callback;
  this.bufferList = new Array();
  this.loadCount = 0;
}

BufferLoader.prototype.load_buffer = function(url, index)
{
  var request = new XMLHttpRequest();
  request.open("GET", url, true);
  request.responseType = "arraybuffer";

  var loader = this;

  request.onload = function() {
    loader.audio_ctx.decodeAudioData(
      request.response,
      function(buffer) {
        if (!buffer) {
          alert('error decoding file data: ' + url);
          return;
        }
        loader.bufferList[index] = buffer;
        if (++loader.loadCount == loader.urlList.length)
          loader.onload(loader.bufferList);
      },
      function(error) {
        console.error('decodeAudioData error', error);
      }
    );
  }

  request.onerror = function() {
    alert('BufferLoader: XHR error');
  }

  request.send();
};

BufferLoader.prototype.load = function() {
  for (var i = 0; i < this.urlList.length; ++i)
  this.load_buffer(this.urlList[i], i);
};

function play_sound(buffer, time) 
{
  var source = audio_ctx.createBufferSource();
  source.buffer = buffer;
  source.connect(audio_ctx.destination);
  source[source.start ? 'start' : 'noteOn'](time);
}

function load_sounds(obj, soundMap, callback) 
{
  var names = [];
  var paths = [];
  for (var name in soundMap) 
  {
    var path = soundMap[name];
    names.push(name);
    paths.push(path);
  }
  bufferLoader = new BufferLoader(audio_ctx, paths, function(bufferList) {
    for (var i = 0; i < bufferList.length; i++) 
    {
      var buffer = bufferList[i];
      var name = names[i];
      obj[name] = buffer;
    }
    if (callback)
    {
      callback();
    }
  });
  bufferLoader.load();
}

var buffers = {};
var active_buffers = [];
var samples_dir = [location.origin,'/samples/'].join('');
var paths = {};
file_names.forEach(function(fn) {
  paths[fn] = [samples_dir, fn].join(''); 
})

function set_default_active_buffers()
{
  file_names.forEach(add_sound_assignment);
}
