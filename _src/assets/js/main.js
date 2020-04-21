'use strict';
// debugger
console.log('>> Ready :)');

const cards = document.querySelector('.js-cards');
const button = document.querySelector('.js-button');
const numberOfCards = document.querySelectorAll('.js-numberOfCards');

let cardsList = [];
let numberForUrl = "";

let array = [1,1,2,2,3,3,4,4,5,5,6,6];

// Función con la que se ordenan las tarjetas aleatoriamente

Array.prototype.shuffle = function(){
  for (var i = this.length-1; i>0;i--){
    var j = Math.floor(i * Math.random());
    var tmp = this[j];
    this [j] = this[i];
    this[i] = tmp;
  }
  return this;
}
var foo = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 0 ];

console.log(foo.shuffle());


// Get data from server


function getServerData(){
  fetch(`https://beta.adalab.es/ejercicios-extra/api/pokemon-cards/${numberForUrl}.json`)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      cardsList = data;      
    })
    .then(function(result){
      cardsList.shuffle();
    })

    .catch(function(err) {
      console.log("Error al traer los datos del servidor", err);
    });


  paintCards();
  listenToButtton();
}

// Painting 

function paintCards() {
  let cardsPainting = "";
  
  for (let i = 0; i < cardsList.length; i++) {
    cardsPainting += `<li class="card"><div class="open">
    <img src="${cardsList[i].image}" alt="${cardsList[i].name}" class="poke-img">
    <p class="poke-name">${cardsList[i].name}</p> 
    </div></li>`;    
  }

  cards.innerHTML = cardsPainting; 

}


//Functions related to listening

function handleButton() {
  // debugger
  DetectCheckedOption();
  getServerData();
}


function DetectCheckedOption(){

  for(let i=0; i< numberOfCards.length; i++){
    if (numberOfCards[i].checked === true){
      numberForUrl = numberOfCards[i].value;
      console.log('valor: ', numberOfCards[i].value, 'constante: ', numberForUrl);
    }    
  }
}  

function listenToButtton() {
  button.addEventListener("click",handleButton);
}

listenToButtton();
DetectCheckedOption();


