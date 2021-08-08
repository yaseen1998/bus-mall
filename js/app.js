




'use strict';

let imgArray = ['bag.jpg','banana.jpg','bathroom.jpg','boots.jpg','breakfast.jpg',
'bubblegum.jpg','bubblegum.jpg','chair.jpg','cthulhu.jpg','dog-duck.jpg',
'dragon.jpg','pen.jpg','pet-sweep.jpg','scissors.jpg','shark.jpg','sweep.png',
'tauntaun.jpg','unicorn.jpg','water-can.jpg','wine-glass.jpg']

const imageSection = document.getElementById('imageSection');
const main = document.getElementById('imageSection');
const ul = document.getElementById("vote");
let button =  document.getElementById('button')


    let first ;
    let second ;
    let third ;

let all = [];
let counter = 0;
let numberOfRound = 25;

function getRandomNumber( min, max ) {
    return Math.floor( Math.random() * ( max - min + 1 ) + min );
  }

function Rest(  name,imageSrc ) {
    this.name = name;
    this.image = imageSrc;
    this.click = 0;
    this.shown =0;
    Rest.all.push( this );
  }
  Rest.all = [];

  function render() {
    
    first =getRandomNumber( 0, imgArray.length - 1 );
    second=getRandomNumber( 0, imgArray.length - 1 );
    third=getRandomNumber( 0, imgArray.length - 1 );
    counter ++
    firstImage.src = './img/' + Rest.all[first].image;
    secondImage.src = './img/' + Rest.all[second].image;
    thirdImage.src = './img/' + Rest.all[third].image;
Rest.all[first].shown++
Rest.all[second].shown++
Rest.all[third].shown++

    console.log(Rest.all)

  }
  for( let i = 0; i < imgArray.length; i++ ) {
    new Rest( imgArray[i].split( '.' )[0], imgArray[i] );
  }
  
  

  render();
  imageSection.addEventListener('click', clickHandler);

function clickHandler(e) {
  if(e.target.id === 'firstImage'   &&  counter < numberOfRound) {
    Rest.all[first].click++
    render();
    console.log(counter)


  }
  else if( e.target.id === 'secondImage' && counter < numberOfRound){
    Rest.all[second].click++
    render();
    console.log(counter)

  }
  else if (e.target.id === 'thirdImage' && counter < numberOfRound){
    Rest.all[third].click++
    render();
    console.log(counter)

  }
  else if (counter == 25)  {

let butd = document.createElement('button');
butd.onclick = function() {myFunction()}
butd.type="button"
butd.id = "but"
butd.textContent = "result"
button.appendChild(butd)

imageSection.removeEventListener('click', clickHandler) 

}
}
function myFunction(){
    for (let i = 0; i < imgArray.length; i++ ){
        let liElement = document.createElement('li');
        liElement.textContent =Rest.all[i].name + " had " +Rest.all[i].click+" vote, " +"  and was seen " + Rest.all[i].shown +"times";
        if (Rest.all[i].click != 0 ){
liElement.className = "voting"
        } 
        ul.appendChild(liElement);

          }
          let li = document.createElement('li')
          li.innerHTML = '<b> number of try :'+counter +'</b>'
          ul.appendChild(li)
          button.remove()

let butdr = document.createElement('button');
butdr.onclick = function() {location.reload()}
butdr.type="button"
butdr.id = "but"
butdr.textContent = "reload"
ul.appendChild(butdr)
}
