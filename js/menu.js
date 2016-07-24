var content = document.getElementsByClassName('content')[0];

function unhighlight_rows()
{
  content.childNodes.forEach(function(node){ node.style = "background: #505050" });
}

function handle_click_li(event)
{
  unhighlight_rows();

  var target = event.target;
  target.style = "background: #ffffff;"
  var key = target.innerText;
  active_buffers[0] = buffers[key];
}

function add_sound_assignment(file_name)
{
  var node = document.createElement('li');
  node.innerText = file_name;
  node.addEventListener('click', handle_click_li);

  content.appendChild(node);
}
