const bgArray = [
    "url('./static/wall1.png')", 
    "url('./static/wall2.jpeg')", 
    "url('./static/wall3.png')",
    "url('./static/wall4.png')",
    "url('./static/wall5.png')",
    "url('./static/wall6.png')",
    "url('./static/wall7.png')"
]

const cardArray = [
    { name: "1", img: "./static/1.png", },
    { name: "1", img: "./static/1.png", },
    { name: "2", img: "./static/2.png", },
    { name: "2", img: "./static/2.png", },
    { name: "3", img: "./static/3.png", },
    { name: "3", img: "./static/3.png", },
    { name: "4", img: "./static/4.png", },
    { name: "4", img: "./static/4.png", },
    { name: "5", img: "./static/5.png", },
    { name: "5", img: "./static/5.png", },
    { name: "6", img: "./static/6.png", },
    { name: "6", img: "./static/6.png", },
    //    {name: "7", img: "./static/7.png",},
    //  {name: "7", img: "./static/7.png",},
    // {name: "8", img: "./static/8.png",},
    // {name: "8", img: "./static/8.png",},
];

const gameDiv = document.createElement("gameDiv");
const gameContent = document.createTextNode("Hi!!!!!!!!!!!!!1");
const innerGameDiv = document.createElement("innerGameDiv");
let clonedArray;
let shuffledArray;
const statusBoard = document.createElement("statusBoard");
let gameTime;
let gameClicks;
const playAgainButton = document.createElement("playAgainButton");
const timeBoard = document.createElement("timeBoard");
const clickBoard = document.createElement("clickBoard");
let images;
let selectedCards = [];
let startTime;
let currentTime;
let elapsedTime;
let randomBgImage;



function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// use loader / preloading imgs
function createBoard(grid, array) {
    array.forEach((arr, index) => {
        let img = document.createElement("img");
        img.setAttribute("src", "./static/que.png");
        img.setAttribute("data-id", index);
        grid.appendChild(img);
    }
    )
}


function flipCard() {
    
    let selectedCardId = this.dataset.id;
    if (!selectedCards.includes(selectedCardId)) { //prevent clicking same card twice
    selectedCards.push(selectedCardId);
    this.classList.toggle("flip");
    this.setAttribute("src", shuffledArray[selectedCardId].img);
    gameClicks += 1;
    clickBoard.innerHTML = "Clicks: " + gameClicks;
    clickBoard.appendChild(playAgainButton);

    }
    if (selectedCards.length == 2) {
        // freeze event listener to prevent more than 2 flips
        Array.from(images).forEach(image => image.removeEventListener("click", flipCard));
        setTimeout(checkIfMatching, 500);
}
}

function checkIfMatching() {
    let firstCard = selectedCards[0];
    let secondCard = selectedCards[1];
    let firstName = shuffledArray[firstCard].name;
    let secondName = shuffledArray[secondCard].name;
    if (firstCard !== secondCard && firstName == secondName) {
        matchedCards(images[firstCard], images[secondCard])
        //images[firstCard].classList.add("matched");
        //images[secondCard].classList.add("matched");
    }
    else {
        flipBackCards();
    }
    selectedCards = []; // other ways to clear; preferably array should have 2 elems at all times
    Array.from(images).forEach(image => image.addEventListener("click", flipCard));
}

// pick only flipped
function flipBackCards() {
    images.forEach((image) => {
        image.classList.remove("flip");
        image.setAttribute("src", "./static/que.png");
    })
}

function matchedCards(first, second) {
    first.classList.add("blinking");
    second.classList.add("blinking");
    setTimeout(function() {
        first.classList.remove("blinking");
        second.classList.remove("blinking");    
        first.classList.add("matched");
        second.classList.add("matched");
    }, 100);

}

function countTime() { //request animation time/frame
    currentTime = Math.floor(Date.now() / 1000);
    elapsedTime = currentTime - startTime;
    let minutesElapsed = Math.floor(elapsedTime / 60);
    let secondsElapsed = Math.floor(elapsedTime % 60);

    minutesElapsed = twoDigitsTime(minutesElapsed);
    secondsElapsed = twoDigitsTime(secondsElapsed);

    timeBoard.innerHTML = minutesElapsed + ":" + secondsElapsed;
    let timeTime = setTimeout(countTime, 100);
}


function twoDigitsTime(time) {
    if (time < 10) {
        return time = "0" + time;
    }
    else { return time; }
}

function playAgain() {
    shuffledArray = [];
    selectedCards = [];
    gameDiv.innerHTML = "";
    innerGameDiv.innerHTML = "";
    initGame();
}

function initGame() {
    randomBgImage = Math.floor(Math.random() * ((bgArray.length) - 0));
    console.log(randomBgImage);
    innerGameDiv.style.backgroundImage = bgArray[randomBgImage];
    startTime = Math.floor(Date.now() / 1000);
    gameTime = 0;
    gameClicks = 0;
    clonedArray = shuffle([...cardArray]);
    shuffledArray = [...clonedArray];
    createBoard(innerGameDiv, shuffledArray);
    timeBoard.innerHTML = gameTime;
    countTime();
    clickBoard.innerHTML = "Clicks: " + gameClicks;
    playAgainButton.innerHTML = "Play Again?";
    playAgainButton.addEventListener("click", playAgain);
    clickBoard.appendChild(playAgainButton);
    statusBoard.appendChild(timeBoard);
    statusBoard.appendChild(clickBoard);
    

    gameDiv.appendChild(gameContent);
    gameDiv.appendChild(innerGameDiv);
    gameDiv.appendChild(statusBoard);

    document.getElementById("main").appendChild(gameDiv);


    images = document.querySelectorAll("img");
    Array.from(images).forEach(image => image.addEventListener("click", flipCard));
}

initGame();
