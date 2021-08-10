

'use strict';

let imgArray = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg',
  'bubblegum.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg',
  'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png',
  'tauntaun.jpg', 'unicorn.jpg', 'water-can.jpg', 'wine-glass.jpg']
// #############################################################################
// #############################################################################
const imageSection = document.getElementById('imageSection');
// const main = document.getElementById('imageSection');
const ul = document.getElementById("vote");
let button = document.getElementById('button')
let stopevent = document.getElementById('stop')
// #############################################################################
// #############################################################################
let first;
let second;
let third;
// let first_image =0
// let second_image = 0
// let third_image =0
let picture = []
let all = [];
let counter = 0;
let numberOfRound = 25;
let nameArr = [];
let shownArr = [];
let clickArr = [];
// #############################################################################
// #############################################################################
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
// #############################################################################
// #############################################################################
function Rest(name, imageSrc, show = 0, clic = 0) {
  this.name = name;
  this.image = imageSrc;
  this.click = clic;
  this.shown = show;
  Rest.all.push(this);
}
Rest.all = [];
getData();

// #############################################################################
// #############################################################################
function render() {

  do {
    first = getRandomNumber(0, imgArray.length - 1);
    second = getRandomNumber(0, imgArray.length - 1)
    third = getRandomNumber(0, imgArray.length - 1)

  }
  while (first == second || third == second || first == third
  || picture.includes(first) || picture.includes(second) || picture.includes(third))
  //     while(first == second || third == second || first == third 
  //       ||first ==first_image || first == second_image || first == third_image
  //       || second ==first_image || second == second_image || second == third_image
  //       || third ==first_image || third == second_image || third == third_image)

  
  picture=[first,second,third]
  console.log(picture)

  //  first_image = first
  //  second_image = second
  //  third_image = third


  counter++
  firstImage.src = './img/' + Rest.all[first].image;
  secondImage.src = './img/' + Rest.all[second].image;
  thirdImage.src = './img/' + Rest.all[third].image;
  Rest.all[first].shown++
  Rest.all[second].shown++
  Rest.all[third].shown++
  localStorage.data = JSON.stringify(Rest.all);

}
// #############################################################################
// #############################################################################
// for( let i = 0; i < imgArray.length; i++ ) {
//   new Rest( imgArray[i].split( '.' )[0], imgArray[i] );
// }
render();
// #############################################################################
// #############################################################################

imageSection.addEventListener('click', clickHandler);

function clickHandler(e) {
  if (e.target.id === 'firstImage' && counter < numberOfRound) {
    Rest.all[first].click++
    render();
    // console.log(counter)


  }
  else if (e.target.id === 'secondImage' && counter < numberOfRound) {
    Rest.all[second].click++
    render();
    // console.log(counter)

  }
  else if (e.target.id === 'thirdImage' && counter < numberOfRound) {
    Rest.all[third].click++
    render();
    // console.log(counter)

  }
  else if (counter == numberOfRound) {
    stopevent.remove()
    let butd = document.createElement('button');
    butd.onclick = function () { myFunction() }
    butd.type = "button"
    butd.id = "but"
    butd.textContent = "Result like a chart"
    button.appendChild(butd)
    stopevent.textContent = "Show Result"

    imageSection.removeEventListener('click', clickHandler)

  }
}
// #############################################################################
// #############################################################################
function myFunction() {
  button.removeChild(button.childNodes[2])
  let butdml = document.createElement('button');
  // butdm.onclick = function() {location.reload()}
  butdml.onclick = function () { location.reload(), localStorage.clear()}
  butdml.type = "button"
  butdml.id = "but"
  butdml.textContent = "reload and clear the data"
  button.appendChild(butdml)
  
  let butdm = document.createElement('button');
  // butdm.onclick = function() {location.reload()}
  butdm.onclick = function () { location.reload()}
  butdm.type = "button"
  butdm.id = "but"
  butdm.textContent = "reload"
  button.appendChild(butdm)


  for (let i = 0; i < Rest.all.length; i++) {
    nameArr.push(Rest.all[i].name);
    shownArr.push(Rest.all[i].shown);
    clickArr.push(Rest.all[i].click)

  }
  let ctx = document.getElementById('myChart').getContext('2d');

  let myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: nameArr,
      datasets: [{
        label: '# click',
        data: clickArr,
        backgroundColor:
          '#3C8DAD',
        borderColor:
          '#F5A962',
        // backgroundColor:
        //         '#125D98',

        // borderColor: 
        //   '#DDDDDD'

        borderWidth: 2,
        order: 2,
        font: {
          size: 30
        }
      }, {
        label: '# shown',
        data: shownArr,
        hoverBackgroundColor: '#125D98',
        hoverBorderColor: '#DDDDDD',

        borderWidth: 2,
        // type: 'line',
        // this dataset is drawn on top
        order: 1
      }]
    },
    options: {
      plugins: {
        legend: {
          labels: {
            // This more specific font property overrides the global property
            font: {
              size: 20
            }, color: 'black'
            ,
          }
        }
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: "black",
            stepSize: 1,
            beginAtZero: true
          }
        }]
      }
    }
  });



}
// #############################################################################
// #############################################################################
function myFunction2() {
  imageSection.removeEventListener('click', clickHandler)
  for (let i = 0; i < imgArray.length; i++) {
    let liElement = document.createElement('li');
    liElement.textContent = Rest.all[i].name + " had " + Rest.all[i].click + " vote, " + "  and was seen " + Rest.all[i].shown + "times";
    if (Rest.all[i].click != 0) {
      liElement.className = "voting"
    }
    ul.appendChild(liElement);

  }
  let li = document.createElement('li')
  li.innerHTML = '<b> number of try :' + counter + '</b>'
  ul.appendChild(li)
  stopevent.remove()
  // button.remove()
  let butl = document.createElement('button');
  butl.onclick = function () { location.reload(), localStorage.clear() }
  butl.type = "button"
  butl.id = "but"
  butl.textContent = "reload and clear the data"
  ul.appendChild(butl)
  let butdr = document.createElement('button');
  butdr.onclick = function () { location.reload() }
  butdr.type = "button"
  butdr.id = "but"
  butdr.textContent = "reload"
  ul.appendChild(butdr)
}
// #############################################################################
// #############################################################################
function getData() {
  if (localStorage.data) {
    let data = JSON.parse(localStorage.data);
    for (let i = 0; i < data.length; i++) {
      new Rest(data[i].name, data[i].image, data[i].shown, data[i].click);
    }
  } else {
    for (let i = 0; i < imgArray.length; i++) {
      new Rest(imgArray[i].split('.')[0], imgArray[i]);
    }
  }
}