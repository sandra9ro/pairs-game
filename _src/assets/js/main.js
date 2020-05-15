'use strict';
console.log('>> Ready :)');

const cards = document.querySelector('.js-cards');
const button = document.querySelector('.js-button');
const numberOfCards = document.querySelectorAll('.js-numberOfCards');
const card = document.querySelector('.js-card');
//Variables para crear el tablero
let cardsList = [];
let numberForUrl = "";
//Variables para jugar
let playingCards = [];
let winningCards = 0;



//   I N I C I O   /   P R E P A R A C I Ó N    D E L    J U E G O


// Función con la que se ordenan las tarjetas aleatoriamente
// Función obtenida de: https://www.etnassoft.com/2011/02/15/manipulacion-de-arrays-en-javascript/ 

Array.prototype.shuffle = function(){
  for (var i = this.length-1; i>0;i--){
    var j = Math.floor(i * Math.random());
    var tmp = this[j];
    this [j] = this[i];
    this[i] = tmp;
  }
  return this;
}


// Get data from server


function getServerData(){
  fetch(`https://beta.adalab.es/ejercicios-extra/api/pokemon-cards/${numberForUrl}.json`)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      cardsList = data;      
    })
    .then(function(){
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
    cardsPainting += `<li class="card"><div class="card js-card">
    <img src="${cardsList[i].image}" alt="${cardsList[i].name}" class="poke-img">
    </div></li>`;    
  }

  cards.innerHTML = cardsPainting; 
  listenToCard()
}


//Functions related to listening

function handleButton() {
  winningCards = 0;
  DetectCheckedOption();
  getServerData();
}


function DetectCheckedOption(){

  for(let i=0; i< numberOfCards.length; i++){
    if (numberOfCards[i].checked === true){
      numberForUrl = numberOfCards[i].value;
    }    
  }
}

function listenToButtton() {
  button.addEventListener("click",handleButton);
}





//   D U R A N T E       E L       J U E G O


console.log(playingCards);


function openCards(ev) {
  ev.target.classList.add("open");
  if (playingCards.length < 2){
    playingCards.push(ev.target)
  }  
}


function compareCards(){   
  if (playingCards.length == 2 && playingCards[0].alt == playingCards[1].alt){
    playingCards =[];
    winningCards += 2;
  }else if(playingCards.length == 2 && playingCards[0].alt !== playingCards[1].alt)
  {
    setTimeout(()=>{for(let i=0;i<playingCards.length;i++){
      playingCards[i].classList.remove("open");
      };
      playingCards = [];
    }, 500);
  }
  listenToCard();
}

function alertWin(){
  if (winningCards === cardsList.length){
    alert('¡¡¡  Has ganado :D  !!!');
    winningCards = 0;
  }
}


//Función para que las cartas sólo sean escuchadas cuando están cerradas
function tieneClase(ev){
  if(ev.target.classList.contains("open") === false){
    console.log('no la tiene');    
    openCards(ev);
    compareCards(ev);
  
  }else{
    console.log('sí la tiene');    
  }
}


function play(ev){
  tieneClase(ev);
  // openCards(ev);
  // compareCards(ev);
  alertWin();
}

function listenToCard(){
 cards.addEventListener("click", play);
}

listenToButtton();
DetectCheckedOption();
