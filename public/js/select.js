var selected = [];
var emoticonsContainer = document.getElementById('emoticons');
emoticonsContainer.addEventListener('click', function(event) {
  if (event.target.matches('.emoticon')) {
    event.stopPropagation();
    event.target.classList.add('selected');
    selected.push(event.target);
  }
});
