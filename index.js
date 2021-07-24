console.log('this is index.js');
//creating a constructor named book for which the object is going to be created later 
 function Book(name, author  , type){
    this.name = name;
    this.author = author;
    this.type = type;
 }


 //display constructor

 function Display(){
      
 }

 let counter = 1;
// add methods to the prototype of display 
Display.prototype.add  = function(Book){
   let tableBody = document.getElementById('tableBody');
   tableBody.innerHTML += `<tr>
                     <td>${counter}</td>
                     <td>${Book.name}</td>
                     <td>${Book.author}</td>
                     <td>${Book.type}</td>
                  </tr>`;
                  counter++;

}

Display.prototype.clear = function(){
   let libraryForm = document.getElementById('libraryForm');
   libraryForm.reset();
}



//add submit eventListener to the form

let libraryForm = document.getElementById('libraryForm');
libraryForm.addEventListener('submit' , libraryFormSubmit);

function libraryFormSubmit(e){
   e.preventDefault();
   console.log('this is awesome');
   let name = document.getElementById('Name');
   let author = document.getElementById('Author');
   name = name.value;
   author = author.value;
   let programming = document.getElementById('programming');
   let fiction = document.getElementById('fiction');
   let cooking = document.getElementById('cooking');
   let type;
   if(programming.checked ){
      type = programming.value;
   }else if(fiction.checked){
      type = fiction.value;
   }else if(cooking.checked){
      type = cooking.value;
   }
   let book = new Book(name  , author , type);
   console.log(book);
   let display = new Display();
   display.clear();
   display.add(book);
   console.log(display);

}


