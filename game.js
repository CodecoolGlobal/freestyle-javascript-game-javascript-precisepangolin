const cardArray = [
    {name: "1", img: "./static/1.png",},
    {name: "1", img: "./static/1.png",},
    {name: "2", img: "./static/2.png",},
    {name: "2", img: "./static/2.png",},
    {name: "3", img: "./static/3.png",},
    {name: "3", img: "./static/3.png",},
    {name: "4", img: "./static/4.png",},
    {name: "4", img: "./static/4.png",},
    {name: "5", img: "./static/5.png",},
    {name: "5", img: "./static/5.png",},
    {name: "6", img: "./static/6.png",},
    {name: "6", img: "./static/6.png",},
//    {name: "7", img: "./static/7.png",},
  //  {name: "7", img: "./static/7.png",},
   // {name: "8", img: "./static/8.png",},
   // {name: "8", img: "./static/8.png",},

];



function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

let clonedArray = shuffle([...cardArray]);
let shuffledArray = [...clonedArray];


function createBoard(grid, array) {
    array.forEach((arr, index) => {
    let img = document.createElement("img");
    img.setAttribute("src", "./static/que.png");
    img.setAttribute("data-id", index);
    grid.appendChild(img);
    }
)}

const gameDiv = document.createElement("gameDiv");
const gameContent = document.createTextNode("Hi!!!!!!!!!!!!!1");
const innerGameDiv = document.createElement("innerGameDiv");
createBoard(innerGameDiv, shuffledArray);
const statusBoard = document.createElement("statusBoard");
let gameTime = 0;
let gameClicks = 0;
let timeBoard = document.createElement("timeBoard");
timeBoard.innerHTML = "Time: " + gameTime;
let clickBoard = document.createElement("clickBoard");
clickBoard.innerHTML = "Clicks: " + gameClicks;
statusBoard.appendChild(timeBoard);
statusBoard.appendChild(clickBoard);

gameDiv.appendChild(gameContent);
gameDiv.appendChild(innerGameDiv);
gameDiv.appendChild(statusBoard);

document.getElementById("main").appendChild(gameDiv);

let images;
images = document.querySelectorAll("img");
Array.from(images).forEach(image => image.addEventListener("click", flipCard));
console.log(images);

let selectedCards = [];

function flipCard() {
    if (selectedCards.length === 2) {
        setTimeout()
    }
    let selectedCardId = this.dataset.id;
    selectedCards.push(selectedCardId);
    this.classList.toggle("flip");
    this.setAttribute("src", shuffledArray[selectedCardId].img);
    gameClicks +=1;
    clickBoard.innerHTML = "Clicks: " + gameClicks;
    
    console.log(gameClicks);
    if (selectedCards.length === 2) {
        setTimeout(checkIfMatching, 500);
    }
}

function checkIfMatching() {
    let firstCard = selectedCards[0];
    let secondCard = selectedCards[1];
    let firstName = shuffledArray[firstCard].name;
    let secondName = shuffledArray[secondCard].name;
    if (firstCard !== secondCard && firstName === secondName) {
        alert("Match!");
        console.log(firstCard);
        console.log(secondCard);
        console.log(images[firstCard]);
        console.log(images[secondCard]);
        console.log(images);
        //images[firstCard].style.display = "none";
        //images[secondCard].style.display = "none";
        images[firstCard].classList.add("matched");
        images[secondCard].classList.add("matched");
    }
    else {
        images[firstCard].classList.remove("flip");
        images[secondCard].classList.remove("flip");
        images[firstCard].setAttribute("src", "./static/que.png");
        images[secondCard].setAttribute("src", "./static/que.png");
    }
    selectedCards = [];
}

initGame();

function initGame() {

    // Your game can start here, but define separate functions, don't write everything in here :)

}
