var frames_down = [];
var frames_up = [];
var num_seconds = 100;
var fps = 50;
var num_frames = num_seconds * fps;
var fmillis = 1000 / fps;

var frame_i = 0;
function advance_frame() { ++frame_i; }

var recording = false;
var playing = false;
var record_handle;
var play_handle;

function key_is_valid(key)
{
  return (all_keys.indexOf(key) != -1);
}

function send_press_key(key)
{
  if (!key_is_valid(key))
    return;

  var event = { key: key }
  press_key(event);
}

function send_release_key(key)
{
  if (!key_is_valid(key))
    return;

  var event = { key: key }
  release_key(event);
}

function push_keydown(key)
{
  if (!key_is_valid(key))
    return;

  frames_down[frame_i].push(key);
}

function push_keyup(key)
{
  if (!key_is_valid(key))
    return;

  frames_up[frame_i].push(key);
}

function push_keydown_event(event){ push_keydown(event.key); }
function push_keyup_event(event){ push_keyup(event.key); }

function clear_frames()
{
  for (var i = 0; i < num_frames; ++i)
  {
    frames_down[i] = [];
    frames_up[i] = [];
  }
}

function start_recording()
{
  if (!recording && !playing)
  {
    fill_record(red);
    clear_frames();
    frame_i = 0;
    recording = true;
    record_handle = setInterval(advance_frame, fmillis);
    setTimeout(stop_recording, num_seconds * 1000);
    window.addEventListener('keydown', push_keydown_event); 
    window.addEventListener('keyup', push_keyup_event);
  }
}

function stop_recording()
{
  fill_record(white);
  all_keys.forEach(push_keyup);
  window.removeEventListener('keydown', push_keydown_event);
  window.removeEventListener('keyup', push_keyup_event);
  window.clearInterval(record_handle);
  recording = false;
}

function play_frame()
{
  frames_down[frame_i].forEach(send_press_key);
  frames_up[frame_i].forEach(send_release_key);
  advance_frame();
}

function start_playback()
{
  if (!playing && !recording)
  {
    fill_play(green);
    frame_i = 0;
    playing = true;
    play_handle = setInterval(play_frame, fmillis);
    setTimeout(stop_playback, num_seconds * 1000);
  }

}

function stop_playback()
{
  fill_play(white);
  playing = false;
  window.clearInterval(play_handle);
  all_keys.forEach(send_release_key);
}

function check_key()
{
  var key = event.key;
  if (key == 'r')
    start_recording();
  if (key == 'p')
    start_playback();
  if (key == ' ')
  {
    if (recording)
      stop_recording();
    if (playing)
      stop_playback();
  }
}

clear_frames();
window.addEventListener('keydown', check_key)
