var content = document.getElementsByClassName('content')[0];

function unhighlight_rows()
{
  content.childNodes.forEach(function(node){ node.style = "background: #505050" });
}

function handle_click_li_gen(sequencer)
{
  return function(event) {
    unhighlight_rows();

    var target = event.target;
    var key = target.innerText;
    target.style = "background: #ffffff;"
    active_buffers[sequencer.active_row] = buffers[key];
  };
}

function add_sound_assignment_gen(sequencer)
{
  return function(file_name) {
    var node = document.createElement('li');
    node.innerText = file_name;
    node.addEventListener('click', handle_click_li_gen(sequencer));

    content.appendChild(node);
  };
}
