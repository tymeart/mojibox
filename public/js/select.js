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
  if (selectMode) {
    selectMode = false;
    // change style of select link to indicate select mode is OFF somehow
    deleteButton.classList.add('hide');
  } else {
    selectMode = true;
    // change style of select link to indicate select mode is ON somehow
    deleteButton.classList.remove('hide');
    emoticonsContainer.addEventListener('click', function(event) {
      if (event.target.matches('.emoticon')) {
        event.stopPropagation();
        event.target.classList.toggle('selected');
        toggleSelectedArrItems(event.target.innerHTML);
      }
    });
  }
});

function deleteReq() {
  axios.delete('/user/' + user.username + '/collection/delete', {
    params: {selectedArr: selected}
  });
}
