console.log("this is index.js");
showBooks();
//creating a constructor named book for which the object is going to be created later
function Book(name, author, type , createdAt) {
  this.name = name;
  this.author = author;
  this.type = type;
  this.createdAt = createdAt;
}

//display constructor

function Display() {}

// add methods to the prototype of display
Display.prototype.add = function (Book) {
  let tableBody = document.getElementById("tableBody");
  tableBody.innerHTML += `<tr>
                               <td>${notesObj.length+1}</td>
                               <td>${Book.name}</td>
                               <td>${Book.author}</td>
                               <td>${Book.type}</td>
                               <td>${Book.createdAt}</td>
                               <td style ='border:none ; padding:5px;'> <button   onclick = " refreshPage()"   class="btn btn-primary">Delete Note</button></td>
                            </tr>`;
};

Display.prototype.clear = function () {
  let libraryForm = document.getElementById("libraryForm");
  libraryForm.reset();
};

Display.prototype.validate = function (book) {
  if (book.name.length < 2 || book.author.length < 2) {
    return false;
  } else {
    return true;
  }
};

Display.prototype.show = function (type, alertmessage) {
  let message = document.getElementById("alertMsg");
  message.innerHTML = `<div class="alert alert-${type}" role="alert">
                           <strong>${alertmessage}</strong>
                        </div>`;
  setTimeout(function () {
    message.innerHTML = "";
  }, 2000);
};

function showBooks() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  notesObj.forEach(function (element, index) {
    if (element.name == "" || element.author == "") {
      return false;
    } else {
      let tableBody = document.getElementById("tableBody");
      tableBody.innerHTML += `<tr class="tableRow">
                                 <td>${index+1}</td>
                                 <td>${element.name}</td>
                                 <td>${element.author}</td>
                                 <td>${element.type}</td>
                                 <td>${element.createdAt}</td>
                                 <td style ='border:none ; padding:5px;'> <button id =  ' ${index} '  onclick = "deleteNote(this.id); refreshPage();"   class="btn btn-primary">Delete Note</button></td>
                              </tr>`;
    }
  });
}

//add submit eventListener to the form

let libraryForm = document.getElementById("libraryForm");
libraryForm.addEventListener("submit", libraryFormSubmit);

function libraryFormSubmit(e) {
  e.preventDefault();
  console.log("this is awesome");
  let name = document.getElementById("Name");
  let author = document.getElementById("Author");
  name = name.value;
  name = name.toLowerCase();
  author = author.value;
  author = author.toLowerCase();
  let programming = document.getElementById("programming");
  let fiction = document.getElementById("fiction");
  let cooking = document.getElementById("cooking");
  let type;
  if (programming.checked) {
    type = programming.value;
  } else if (fiction.checked) {
    type = fiction.value;
  } else if (cooking.checked) {
    type = cooking.value;
  }
  let createdAt = new Date();
  createdAt = createdAt.toDateString();
  let book = new Book(name, author, type , createdAt);

  let display = new Display();
  console.log(display);
  if (display.validate(book)) {
    display.add(book);
    display.clear();
    display.show("success", "Your book has been added successfully");
  } else {
    display.show("danger", "Sorry you cannot add this book");
  }

  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  notesObj.push(book);

  localStorage.setItem("notes", JSON.stringify(notesObj));
}

let searchButton = document.getElementById("Search");
searchButton.onclick = function (e) {
  e.preventDefault();
};

let search = document.getElementById("searchTxt");
search.addEventListener("input", function () {
  let inputVal = search.value;
  inputVal = inputVal.toLowerCase();
  let tableRow = document.getElementsByClassName("tableRow");
  Array.from(tableRow).forEach(function (element) {
    let nameTxt = element.getElementsByTagName("td")[1].innerText;
    let authorTxt = element.getElementsByTagName("td")[2].innerText;
    let typeTxt = element.getElementsByTagName("td")[3].innerText;
    if (nameTxt.includes(inputVal)) {
      element.style.display = "table-row";
    } else if (authorTxt.includes(inputVal)) {
      element.style.display = "table-row";
    } else if (typeTxt.includes(inputVal)) {
      element.style.display = "table-row";
    } else {
      element.style.display = "none";
    }
  });
});

function deleteNote(index) {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes); //if teh notesobj cointains something then we want the item to retrive that is from json.parses method
  }

  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));

  let deleteButton = document.getElementById(`${index}`);
  console.log(deleteButton);
}

function refreshPage() {
  window.location.reload();
}
