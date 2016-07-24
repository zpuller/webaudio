var audio_ctx = new (window.AudioContext || window.webkitAudioContext)();

var audio_input;
var real_audio_input;
var input_point;

function got_stream(stream) {
  input_point = audio_ctx.createGain();

  real_audio_input = audio_ctx.createMediaStreamSource(stream);
  audio_input = real_audio_input;
  audio_input.connect(input_point);

  analyser_node = audio_ctx.createAnalyser();
  analyser_node.fftSize = 2048;
  input_point.connect( audio_ctx.destination );
}

function init_audio() {
  if (!navigator.getUserMedia)
    navigator.getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
  if (!navigator.cancelAnimationFrame)
    navigator.cancelAnimationFrame = navigator.webkitCancelAnimationFrame || navigator.mozCancelAnimationFrame;
  if (!navigator.requestAnimationFrame)
    navigator.requestAnimationFrame = navigator.webkitRequestAnimationFrame || navigator.mozRequestAnimationFrame;

  navigator.getUserMedia(
      {
          "audio": {
              "mandatory": {
                  "googEchoCancellation": "false",
                  "googAutoGainControl": "false",
                  "googNoiseSuppression": "false",
                  "googHighpassFilter": "false"
              },
              "optional": []
          },
      }, got_stream, function(e) {
          alert('Error getting audio');
          console.log(e);
      });
}

window.addEventListener('load', init_audio);
