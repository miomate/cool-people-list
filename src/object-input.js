var btnAdd = document.getElementById('btnAdd')
var coolPeople = []

function errorHandling (name, age) {
  if (name === null || name === '' || age === null || age === '') {
    console.log('Error')
    return false
  } else {
    return true
  }
}

/* Sent input to object constructor, visual feedback, cleaning input */
var submitInformation = function () {
  var nameInput = document.getElementById('nameInput').value
  var ageInput = document.getElementById('ageInput').value
  var feedbackP = document.getElementById('feedbackP')
  var myObj = {}

  if (!errorHandling(nameInput, ageInput)) {
    return
  }

  myObj.Name = nameInput
  myObj.Age = ageInput
  coolPeople.push(myObj)

  feedbackP.style.visibility = 'visible'
  feedbackP.innerHTML = 'Added'
  setInterval(function () {
    feedbackP.innerHTML = ''
  }, 3000)

  document.getElementById('nameInput').focus()
  document.getElementById('nameInput').value = ''
  document.getElementById('ageInput').value = ''
}

btnAdd.addEventListener('click', submitInformation)

/* Creating Table */
var tableBuildFunc = function () {
  var arrayTable = document.getElementsByClassName('arrayTable')
  var html = ''

  for (var i in coolPeople) {
    html += '<tr><td>' + coolPeople[i].Name + '</td><td>' + coolPeople[i].Age + '<td>' + '<button data-index="' + i + '" onclick="deleteButtonClick(event)" type="submit">x</button>' + '</td></td></tr>'
  } // event listener instead of delete button click

  document.getElementById('tbodyID').innerHTML = html
  arrayTable[0].style.visibility = 'visible' // if add button hit, table is visible
}

/* Deletes specific row and renegerates table */
function deleteButtonClick (event) {
  var current = event.target
  var btnIndex = current.dataset.index

  coolPeople.splice(btnIndex, 1)
  tableBuildFunc()
}

/* Safe to local storage */
var btnSafe = document.getElementById('btnSafe')
var safeLocalStorage = function () {
  window.localStorage.setItem('LScoolPeople', JSON.stringify(coolPeople))
}
btnSafe.addEventListener('click', safeLocalStorage)

var btnDeleteSession = document.getElementById('btnDeleteSession')
var deleteLocalStorage = function () {
  window.localStorage.clear()
  window.location.reload()
}
btnDeleteSession.addEventListener('click', deleteLocalStorage)

/* Check if localStorage has coolPeople, then load, build table */
document.addEventListener('DOMContentLoaded', function () {
  if (window.localStorage.getItem('LScoolPeople')) {
    var localData = JSON.parse(window.localStorage.getItem('LScoolPeople'))
    coolPeople = [...localData] // Spread Operator
    tableBuildFunc()
  }
})

/* Key binding ENTER */
window.addEventListener('keyup', function (event) {
  if (event.keyCode === 13) {
    if (errorHandling()) {
      submitInformation()
    } else {

    }
  }
})

/* Delete last last element in array */
var btnDeleteLast = document.getElementById('btnDeleteLast')
var deleteLastItemFunc = function () {
  coolPeople.pop()
  tableBuildFunc()
  feedbackP.innerHTML = 'Deleted'
  feedbackP.style.visibility = 'visible' // p is unvisible, if clicked visible
  setInterval(function () { // after 2s unvisible again
    feedbackP.style.visibility = 'hidden'
  }, 3000)
}
btnDeleteLast.addEventListener('click', deleteLastItemFunc)

/* Modal */
var modal = document.getElementById('myModal')
var span = document.getElementsByClassName('close')[0]

document.getElementById('modalTrigger').onclick = function () { openModal() }
function openModal () {
  modal.style.display = 'block'
}

span.onclick = function () {
  modal.style.display = 'none'
}

window.onclick = function (event) {
  if (event.target === modal) {
    modal.style.display = 'none'
  }
}
