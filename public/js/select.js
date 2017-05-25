var selected = [];
var emoticonsContainer = document.getElementById('emoticons');
emoticonsContainer.addEventListener('click', function(event) {
  if (event.target.matches('.emoticon')) {
    event.stopPropagation();
    event.target.classList.toggle('selected');
    selected.push(event.target);
  }
});
