'use strict';
// debugger
console.log('>> Ready :)');

const cards = document.querySelector('.js-cards');
const button = document.querySelector('.js-button');
const numberOfCards = document.querySelectorAll('.js-numberOfCards');

let cardsList = [];
let numberForUrl = "";


// Get data from server


function getServerData(){
  fetch(`https://beta.adalab.es/ejercicios-extra/api/pokemon-cards/${numberForUrl}.json`)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      cardsList = data;      
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
    cardsPainting += `<li class="card">
    <img src="${cardsList[i].image}" alt="${cardsList[i].name}" class="poke-img">
    <p class="poke-name">${cardsList[i].name}</p> 
    </li>`;
    
  }

  cards.innerHTML = cardsPainting; 

}


//Functions related to listening

function handleButton() {
  getServerData();
  DetectCheckedOption();
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