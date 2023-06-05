const cards = document.querySelectorAll(".card"),
timeTag = document.querySelector(".time b"),
scoreTag = document.querySelector(".score b")
flipsTag = document.querySelector(".flips b"),
refreshBtn = document.querySelector(".details button");
startBtn = document.querySelector(".pre-game button");

/*let maxTime = 30;*/
let maxTime = 30;
let timeLeft = maxTime;
let flips = 0;
let matchedCard = 0;
let disableDeck = false;
let isPlaying = false;
let cardOne, cardTwo, timer;
let score = 0;
let real_score = 0;
let wrong_times = 0;

var vid = document.getElementById("punish-video");

function initTimer() {
    if(timeLeft <= 0) {
        document.getElementById("game-canvas").style.display = "block";
        document.getElementById("result-panel").style.display = "block"
        document.getElementById("game-over").style.display = "block";
        document.getElementById("your-score").textContent = real_score;
        document.getElementById("score-display").style.display = "block";
        return clearInterval(timer);
    }
    timeLeft--;
    timeTag.innerText = timeLeft;
}

function flipCard({target: clickedCard}) {
    if(!isPlaying) {
        isPlaying = true;
        /*timer = setInterval(initTimer, 1000);*/
    }
    if(clickedCard !== cardOne && !disableDeck && timeLeft > 0) {
        flips++;
        flipsTag.innerText = flips;
        clickedCard.classList.add("flip");
        if(!cardOne) {
            return cardOne = clickedCard;
        }
        cardTwo = clickedCard;
        disableDeck = true;
        let cardOneImg = cardOne.querySelector(".back-view img").src,
        cardTwoImg = cardTwo.querySelector(".back-view img").src;
        matchCards(cardOneImg, cardTwoImg);
    }
    if (matchedCard == 8){
        document.getElementById("game-canvas").style.display = "block";
        document.getElementById("result-panel").style.display = "block"
        document.getElementById("game-over").style.display = "block";
        document.getElementById("your-score").textContent = real_score;
        document.getElementById("score-display").style.display = "block";
    }
}

function matchCards(img1, img2) {
    if(img1 === img2) {
        wrong_times = 0;
        matchedCard++;
        score ++;
        real_score = score * 100
        scoreTag.innerText = real_score;
        if(matchedCard == 8 && timeLeft > 0) {
            return clearInterval(timer);
        }
        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);
        cardOne = cardTwo = "";
        return disableDeck = false, score, real_score;
    }
    else{
        wrong_times++;
        if(wrong_times % 5 == 0) {
            showPunish();
            setTimeout("hidePunish()",1000);
        }
    }
    setTimeout(() => {
        cardOne.classList.add("shake");
        cardTwo.classList.add("shake");
    }, 400);

    setTimeout(() => {
        cardOne.classList.remove("shake", "flip");
        cardTwo.classList.remove("shake", "flip");
        cardOne = cardTwo = "";
        disableDeck = false;
    }, 1200);
}

function shuffleCard() {
    timeLeft = maxTime;
    flips = matchedCard = score = wrong_times = 0;
    cardOne = cardTwo = "";
    clearInterval(timer);
    timeTag.innerText = timeLeft;
    scoreTag.innerText = score;
    flipsTag.innerText = flips;
    disableDeck = isPlaying = false;

    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
    arr.sort(() => Math.random() > 0.5 ? 1 : -1);

    cards.forEach((card, index) => {
        card.classList.remove("flip");
        let imgTag = card.querySelector(".back-view img");
        setTimeout(() => {
            imgTag.src = `Zoa/Zoa${arr[index]}.jpg`;
        }, 500);
        card.addEventListener("click", flipCard);
    });
    document.getElementById("game-over").style.display="none";
    document.getElementById("result-panel").style.display = "none";
    timer = setInterval(initTimer, 1000);
}

startBtn.addEventListener("click", shuffleCard);
refreshBtn.addEventListener("click", shuffleCard);

cards.forEach(card => {
    card.addEventListener("click", flipCard);
});


function ShowDiv() {
    document.getElementById("game-canvas").style.display = "block";
    document.getElementById("start-btn").style.display = "none";
    audio = document.getElementById("music");
    audio.volume = 0.5;
    audio.play();
}

function showPunish(){
    document.getElementById("punish-view").style.display = "block";
    document.getElementById("punish-text").style.display = "block";
    vid.play();
}

function hidePunish(){
    document.getElementById("punish-view").style.display = "none";
    document.getElementById("punish-text").style.display = "none";
    /*vid.pause();*/
}


