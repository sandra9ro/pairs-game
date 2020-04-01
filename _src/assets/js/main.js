'use strict';
// debugger
console.log('>> Ready :)');

const cards = document.querySelector('.js-cards');
const button = document.querySelector('.js-button');
const numberOfCards = document.querySelector('.js-numberOfCards');

let cardsList = [];

function getServerData(){
// debugger
  fetch('https://beta.adalab.es/ejercicios-extra/api/pokemon-cards/4.json')
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      // cards.innerHTML = data;
      cardsList = data;
      // console.log(cardsList);
      
    })
    .catch(function(err) {
      console.log("Error al traer los datos del servidor", err);
    });


  paintCards();
  listenToButtton();
}

function paintCards() {
  cards.innerHTML = `<li>nombre: ${cardsList[0].name}</li><li>nombre: ${cardsList[1].name}</li><li>nombre: ${cardsList[2].name}</li><li>nombre: ${cardsList[3].name}</li>
  `
  // console.log(cardsList);
  // cards.innerHTML = cardsList;

}

function listenToButtton(params) {
  
  button.addEventListener("click",getServerData);
}


listenToButtton();