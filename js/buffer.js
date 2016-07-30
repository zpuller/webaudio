function BufferLoader(audio_ctx, url_list, callback)
{
  this.audio_ctx = audio_ctx;
  this.url_list = url_list;
  this.onload = callback;
  this.buffer_list = new Array();
  this.load_count = 0;
}

BufferLoader.prototype.load_buffer = function(url, index) {
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
        loader.buffer_list[index] = buffer;
        if (++loader.load_count == loader.url_list.length)
          loader.onload(loader.buffer_list);
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
  for (var i = 0; i < this.url_list.length; ++i)
  this.load_buffer(this.url_list[i], i);
};

function play_sound(audio_ctx, buffer, time) 
{
  var source = audio_ctx.createBufferSource();
  source.buffer = buffer;
  source.connect(audio_ctx.destination);
  source[source.start ? 'start' : 'noteOn'](time);
}

function load_sounds(audio_ctx, obj, soundMap, callback) 
{
  var names = [];
  var paths = [];
  for (var name in soundMap) 
  {
    var path = soundMap[name];
    names.push(name);
    paths.push(path);
  }
  bufferLoader = new BufferLoader(audio_ctx, paths, function(buffer_list) {
    for (var i = 0; i < buffer_list.length; i++) 
    {
      var buffer = buffer_list[i];
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
