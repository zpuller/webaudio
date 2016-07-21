var audio_ctx = new (window.AudioContext || window.webkitAudioContext)();

var sample_rate = 44100;
var all_keys = ['a','w','s','e','d','f','t','g','y','h','u','j','k'];
var pressed_keys = [];
var oscillator = audio_ctx.createOscillator();
var reverbGain = audio_ctx.createGain();
var masterGain = audio_ctx.createGain();
var delayNode = audio_ctx.createDelay();
var convolver = audio_ctx.createConvolver();

oscillator.connect(masterGain);
masterGain.connect(convolver);
masterGain.connect(audio_ctx.destination);
convolver.connect(reverbGain);
reverbGain.connect(audio_ctx.destination);
reverbGain.gain.value = .1;
masterGain.gain.value = 0; 

oscillator.type = 'sine';
oscillator.frequency.value = 500;
oscillator.start();

var concert_hall_buffer;

function set_reverb(seconds, decay, inBuf)
{
  var length = sample_rate * seconds;
  var buf = audio_ctx.createBuffer(2, length, sample_rate)
  var outL = buf.getChannelData(0);
  var outR = buf.getChannelData(1);
  var inL = inBuf.getChannelData(0);
  var inR = inBuf.getChannelData(1);

  for (var i = 0; i < buf.length; ++i)
  {
    outL[i] = inL[i] * Math.pow((1 - i/buf.length), decay);
    outR[i] = inR[i] * Math.pow((1 - i/buf.length), decay);
  }

  convolver.buffer = buf;
}

function half_steps(n) { return 500 * Math.pow(2, n/12); }

var freq_map = {};
for (var i = 0; i < all_keys.length; ++i)
{
  freq_map[all_keys[i]] = half_steps(i);
}

function release_key(event) 
{
  if (!freq_map[event.key] || pressed_keys.indexOf(event.key) == -1)
    return;
  
  if (pressed_keys.length <= 1)
  {
    masterGain.gain.value = 0; 
    pressed_keys.splice(pressed_keys.indexOf(event.key), 1);
    return;
  }

  if (pressed_keys.length && pressed_keys.length == pressed_keys.indexOf(event.key) + 1)
  {
    var freq = freq_map[pressed_keys[pressed_keys.length - 2]];
    oscillator.frequency.setValueAtTime(freq, 0);
  }
  pressed_keys.splice(pressed_keys.indexOf(event.key), 1);
}

function press_key(event) 
{ 
  if (!freq_map[event.key] || pressed_keys.indexOf(event.key) != -1)
    return;

  var freq = freq_map[event.key];
  oscillator.frequency.setValueAtTime(freq, 0);
  pressed_keys.push(event.key);

  masterGain.gain.value = pressed_keys.length ? 1 : 0; 
}

var request = new XMLHttpRequest();
request.open('GET', [location.origin,'/concert-crowd.ogg'].join(''), true);
request.responseType = 'arraybuffer';
request.onload = function() {
  var audioData = request.response;

  audio_ctx.decodeAudioData(audioData, function(buffer) {
      concert_hall_buffer = buffer;
      var reverb_length_seconds = 3;
      var reverb_decay = 2;
      set_reverb(reverb_length_seconds, reverb_decay, concert_hall_buffer);
    }, function(e){"Error with decoding audio data" + e.err});
}

request.send();

window.addEventListener('keypress', press_key); 
window.addEventListener('keyup', release_key);
