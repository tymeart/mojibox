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
    // select mode OFF
  } else if (selectMode === false){
    selectMode = true;
    deleteButton.classList.remove('hide');
    // select mode ON
    emoticonsContainer.addEventListener('click', function(event) {
      if (event.target.matches('.emoticon')) {
        event.stopPropagation();
        event.target.classList.toggle('selected');
        toggleSelectedArrItems(event.target.id);
      }
    });
  }
});

// toggleSelectedArrItems outside of click handler??
// iterate through the emoticons with selected class
// document.getElementsByClassName('selected')
// pass ids into toggleSelectedArrItems

// selectModeToggle.addEventListener('click', function() {
//   if (selectMode) {
//     selectMode = false;
//     deleteButton.classList.add('hide');
//   } else {
//     selectMode = true;
//     deleteButton.classList.remove('hide');
//     // toggle emoticons in/out of selected array
//     emoticonsContainer.addEventListener('click', function(event) {
//       if (event.target.matches('.emoticon')) {
//         event.stopPropagation();
//         event.target.classList.toggle('selected');
//         toggleSelectedArrItems(event.target.id);
//       }
//     });
//   }
// });
