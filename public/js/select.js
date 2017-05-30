var selectMode = false;
var selected = [];
var selectModeToggle = document.getElementById('selectModeToggle');
var deleteButton = document.getElementById('delete');
var emoticonsContainer = document.getElementById('emoticons');

selectModeToggle.addEventListener('click', function() {
  if (selectMode) {
    selectMode = false;
    // change style of select link to indicate select mode is OFF somehow
    deleteButton.classList.add('hide');
  } else {
    selectMode = true;
    deleteButton.classList.remove('hide');
    emoticonsContainer.addEventListener('click', function(event) {
      if (event.target.matches('.emoticon')) {
        event.stopPropagation();
        event.target.classList.toggle('selected');
      }
    });
  }
});
