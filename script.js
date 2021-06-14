let myTable = document.querySelector('#table')
let myPagination = document.querySelector('#pagination')

let count = 0
var request = new XMLHttpRequest()
request.open(
  'GET',
  'https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json',
  true
)
request.send()

request.onload = function () {
  var data = JSON.parse(this.response)
  sendData(data)
}

var empList = []

function sendData(data) {
  empList = [...data]

  let current_page = 1
  let rows = 10

  function displayList(emps, wrapper, rows_per_page, page) {
    wrapper.innerHTML = ''
    page--
    let start = rows_per_page * page
    let end = start + rows_per_page
    let paginatedEmp = empList.slice(start, end)
    paginatedEmp.forEach((emp) => {
      let row = document.createElement('tr')
      Object.values(emp).forEach((text) => {
        let cell = document.createElement('td')
        let textNode = document.createTextNode(text)
        cell.appendChild(textNode)
        row.appendChild(cell)
      })
      table.appendChild(row)
    })
  }
  function setupPagination(emps, wrapper, rows_per_page) {
    wrapper.innerHTML = ''
    let pageCount = Math.ceil(empList.length / rows_per_page)
    for (let i = -1; i <= pageCount + 2; i++) {
      if (i === -1) {
        let btn = paginationButton('first', emps)
        btn.setAttribute('id', 'first')
        wrapper.appendChild(btn)
      } else if (i === 0) {
        let btn = paginationButton('prev', emps)
        btn.setAttribute('id', 'prev')
        wrapper.appendChild(btn)
      } else if (i === pageCount + 1) {
        let btn = paginationButton('next', emps)
        btn.setAttribute('id', 'next')
        wrapper.appendChild(btn)
      } else if (i === pageCount + 2) {
        let btn = paginationButton('last', emps)
        btn.setAttribute('id', 'last')
        wrapper.appendChild(btn)
      } else {
        let btn = paginationButton(i, emps)
        btn.setAttribute('id', i)
        wrapper.appendChild(btn)
      }
    }
  }
  function paginationButton(page, emps) {
    let button = document.createElement('button')
    button.innerText = page
    if (current_page == page) {
      button.classList.add('active')
    }
    if (page === 'first' || page === 'last') {
      button.addEventListener('click', function () {
        page === 'first' ? (current_page = 1) : (current_page = 10)
        displayList(emps, myTable, rows, current_page)
        let current_btn = document.querySelector('.pagenumbers button.active')
        current_btn.classList.remove('active')
        if (page === 'first') {
          let new_current_btn = document.getElementById(1)
          new_current_btn.classList.add('active')
        } else {
          let new_current_btn = document.getElementById(10)
          new_current_btn.classList.add('active')
        }
      })
    } else if (page === 'prev') {
      button.addEventListener('click', function () {
        let current_btn = document.querySelector('.pagenumbers button.active')
        current_btn.classList.remove('active')
        current_page = parseInt(current_btn.innerHTML) - 1
        if (current_page === 0) {
          displayList(emps, myTable, rows, 1)
          let new_current_btn = document.getElementById(1)
          new_current_btn.classList.add('active')
        } else {
          displayList(emps, myTable, rows, current_page)
          let new_current_btn = document.getElementById(current_page)
          new_current_btn.classList.add('active')
        }
      })
    } else if (page === 'next') {
      button.addEventListener('click', function () {
        let current_btn = document.querySelector('.pagenumbers button.active')
        current_btn.classList.remove('active')
        current_page = parseInt(current_btn.innerHTML) + 1
        if (current_page === 11) {
          displayList(emps, myTable, rows, 10)
          let new_current_btn = document.getElementById(10)
          new_current_btn.classList.add('active')
        } else {
          displayList(emps, myTable, rows, current_page)
          let new_current_btn = document.getElementById(current_page)
          new_current_btn.classList.add('active')
        }
      })
    } else {
      button.addEventListener('click', function () {
        current_page = page
        displayList(emps, myTable, rows, current_page)
        let current_btn = document.querySelector('.pagenumbers button.active')
        current_btn.classList.remove('active')
        button.classList.add('active')
      })
    }
    return button
  }
  displayList(empList, myTable, rows, 1)
  setupPagination(empList, myPagination, rows)
}
