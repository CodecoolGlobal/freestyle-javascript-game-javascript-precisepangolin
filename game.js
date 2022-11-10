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
];



function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

let shuffledArray = [...cardArray];
shuffledArray = shuffle(shuffledArray);
console.log(cardArray);
console.log(shuffledArray);

function createBoard(grid, array) {
array.forEach((arr, index) => {
let img = document.createElement("img");
img.setAttribute("src", "./static/que.png");
img.setAttribute("data-id", index);
grid.appendChild(img);
}
)
}

const gameDiv = document.createElement("gameDiv");
const gameContent = document.createTextNode("Hi!!!!!!!!!!!!!1");
const innerGameDiv = document.createElement("innerGameDiv");
createBoard(innerGameDiv, shuffledArray);
const statusBoard = document.createElement("statusBoard");
let gameTime = 0;
let gameClicks = 0;
const timeBoard = document.createTextNode("Time: " + gameTime);
//timeBoard.appendChild(gameTime);
const clickBoard = document.createTextNode("Clicks: " + gameClicks);
//clickBoard.appendChild(gameClicks);
statusBoard.appendChild(timeBoard);
statusBoard.appendChild(clickBoard);

gameDiv.appendChild(gameContent);
gameDiv.appendChild(innerGameDiv);
gameDiv.appendChild(statusBoard);

document.getElementById("main").appendChild(gameDiv);

let images;
images = document.querySelectorAll("img");
Array.from(images).forEach(image => image.addEventListener("click", flipCard));

let selectedCards = [];

function flipCard() {
    let selectedCardId = this.dataset.id;
    console.log(selectedCardId);
    //selectedCards.push(shuffledArray)
    this.classList.toggle("flip");
    this.setAttribute("src", cardArray[selectedCardId].img);
    console.log(cardArray);
    console.log(shuffledArray);
    console.log(cardArray[selectedCardId].img);
}

initGame();

function initGame() {

    // Your game can start here, but define separate functions, don't write everything in here :)

}
