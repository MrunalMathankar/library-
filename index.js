console.log("this is index.js");
//creating a constructor named book for which the object is going to be created later
function Book(name, author, type) {
  this.name = name;
  this.author = author;
  this.type = type;
}

//display constructor

function Display() {}

let counter = 1;
// add methods to the prototype of display
Display.prototype.add = function (Book) {
  let tableBody = document.getElementById("tableBody");
  tableBody.innerHTML += `<tr>
                     <td>${counter}</td>
                     <td>${Book.name}</td>
                     <td>${Book.author}</td>
                     <td>${Book.type}</td>
                  </tr>`;
  counter++;
};

Display.prototype.clear = function() {
  let libraryForm = document.getElementById("libraryForm");
  libraryForm.reset();
};

Display.prototype.validate = function(book) {
   if(book.name.length<2 || book.author.length<2){
      return false;
   }else{
      return true;
   }
 };

 Display.prototype.show = function(type , alertmessage) {
    let message = document.getElementById('alertMsg');
    message.innerHTML = `<div class="alert alert-${type}" role="alert">
                           <strong>${alertmessage}</strong>
                        </div>`
    setTimeout(function(){
       message.innerHTML = "";
    } ,2000);
 };

//add submit eventListener to the form

let libraryForm = document.getElementById("libraryForm");
libraryForm.addEventListener("submit", libraryFormSubmit);

function libraryFormSubmit(e) {
  e.preventDefault();
  console.log("this is awesome");
  let name = document.getElementById("Name");
  let author = document.getElementById("Author");
  name = name.value;
  author = author.value;
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
  let book = new Book(name, author, type);
  console.log(book);
  let display = new Display();
  if(display.validate(book)){
     display.add(book);
     display.clear();
     display.show('success' , 'Your book has been added successfully');
  }else{
     display.show('danger' , 'Sorry you cannot add this book');
  }
  
}
