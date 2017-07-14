var user = user;
var selectMode = false;
var selected = [];
var selectModeToggle = document.getElementById('selectModeToggle');
var deleteButton = document.getElementById('delete');
var emoticonsContainer = document.getElementById('emoticons');

function toggleSelectedArrItems(emoticon) {
  var index = selected.indexOf(emoticon);
  if (index === -1) {
    selected.push(emoticon);
  } else {
    selected.splice(index, 1);
  }
}

selectModeToggle.addEventListener('click', function() {
  if (selectMode === true) {
    selectMode = false;
    deleteButton.classList.add('hide');
  } else if (selectMode === false){
    selectMode = true;
    deleteButton.classList.remove('hide');
  }
});

emoticonsContainer.addEventListener('click', function(event) {
  if (!selectMode) {
    return;
  }
  if (event.target.matches('.emoticon')) {
    event.stopPropagation();
    event.target.classList.toggle('selected');
    toggleSelectedArrItems(event.target.id);
  }
});
