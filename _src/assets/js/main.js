'use strict';
// debugger
console.log('>> Ready :)');

const cards = document.querySelector('.js-cards');
const button = document.querySelector('.js-button');
const numberOfCards = document.querySelectorAll('.js-numberOfCards');
const card = document.querySelector('.js-card');
let cardsList = [];
let numberForUrl = "";


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
  // debugger
  DetectCheckedOption();
  getServerData();
}


function DetectCheckedOption(){

  for(let i=0; i< numberOfCards.length; i++){
    if (numberOfCards[i].checked === true){
      numberForUrl = numberOfCards[i].value;
      // console.log('valor: ', numberOfCards[i].value, 'constante: ', numberForUrl);
    }    
  }
}

function listenToButtton() {
  button.addEventListener("click",handleButton);
}





//   D U R A N T E       E L       J U E G O

let playingCards = [];
let winningCards = 0;

console.log(playingCards);


function openCards(ev) {
  ev.target.classList.add("open");
  if (playingCards.length < 2){
    playingCards.push(ev.target)
  // }else{
  //   playingCards = [];
  //   playingCards.push(ev.target)
  }  
  console.log('playingCards: ',playingCards);  
}

// var timeoutID;
// function delayClosing(){
//   timeoutID = setTimeout(closeCards, 2000);
// }
// function closeCards(){
//   for (let i=0; i < this.length; i++){
//     this[i].classList.remove("open");
//   }
// }

// function slowClose(){
//   setTimeout(closeCards, 2000);
// }

function loguear(){
  setInterval(console.log('holita'), 5000);  
}


function compareCards(){    
  if (playingCards.length == 2 && playingCards[0].alt == playingCards[1].alt){
    playingCards =[];
    winningCards += 2;
  }else if(playingCards.length == 2 && playingCards[0].alt !== playingCards[1].alt){
    // setTimeout(closeCards, 1000);
    // loguear();
    setTimeout(()=>{for (const i=0; i<cardsList.length; i++) {
      cardsList[i].classList.remove('open');}
    }, 5000);

    // for (let i = 0; i < playingCards.length; i++) {
    //   playingCards[i].classList.remove("open");
    //   }
    // playingCards = [];
  }

    
  // console.log('array: ', playingCards, 'constante:', winningCards);  
  listenToCard();
}

function alertWin(){
  if (winningCards === cardsList.length){
    alert('¡¡¡Has ganado!!! :D');
    winningCards = 0;
  }
}


function play(ev){
  openCards(ev);
  compareCards(ev);
  alertWin();
}

function listenToCard(){
 cards.addEventListener("click", play);
}

listenToButtton();
DetectCheckedOption();
