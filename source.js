const moves = document.getElementById('move-count')
const timeValue = document.getElementById('time')
const startButton = document.getElementById('start')
const stopButton = document.getElementById('stop')
const gameCon = document.querySelector('.game-container')

const result = document.getElementById('result')
const controls = document.querySelector('.controls-container')
let timeWin;
let hasFlippedcard = false
let cards;
let interval;
let firstcard,secondcard
let firstAtt, secondAtt
let flipped = false
var lockcard = []

const items = [
    { name : "anaconda", image : "/images/anaconda.png"},
    { name : "bee", image : "/images/bee.png"},
    { name : "capybara", image : "/images/capybara.png"},
    { name : "chameleon", image : "/images/chameleon.png"},
    { name : "crocodile", image : "/images/chameleon.png"},
    { name : "gorilla", image : "/images/gorilla.png"},
    { name : "heliconia", image : "/images/heliconia.png"},
    { name : "ladybug", image : "/images/ladybug.png"},
    { name : "macaw", image : "/images/macaw.png"},
    { name : "tiger", image : "/images/tiger.png"},
]


let seconds= 0,
    minutes = 0;

let moveCount = 0,
wincount = 0;

const timeGenerate = () =>{
    seconds += 1
    if(seconds >=60){
        minutes += 1
        seconds = 0
    }

    let secondsValue = seconds < 10 ? '0'+seconds:seconds;

    let minutesValue = minutes < 10 ? '0'+minutes:minutes;

    timeValue.innerHTML = `<span>Time : </span>${minutesValue}:${secondsValue}`
    timeWin = minutes + ':' + seconds + ' Seconds'
    if(moveCount === 8){
        clearInterval(interval)
        controls.classList.remove('hide')
        stopButton.classList.add('hide')
        startButton.classList.remove('hide')
        result.innerHTML = 'You won with : ' + timeWin
    }

};


const moveCounter = () =>{
    moveCount += 1
    moves.innerHTML = `<span>Moves : </span>${moveCount}`;
}

const generateRandom = (size=4)=>{
    let tempArray = [...items]

    let cardValues = []

    size = (size*size) / 2;

    for(let i = 0; i<size; i++){
        const randomIndex = Math.floor(Math.random() * tempArray.length)
        cardValues.push(tempArray[randomIndex]);

        tempArray.splice(randomIndex, 1);

    }

    return cardValues
}

const matrixGenerate = (cardValues, size = 4) =>{
    gameCon.innerHTML = "";
    cardValues = [...cardValues, ...cardValues];
    cardValues.sort(()=> Math.random() - 0.5)

    for(let i = 0; i<size*size ; i++){
        gameCon.innerHTML += `
        <div class ="card-container" id="card" data-framework="${cardValues[i].name}">
            <div class="card-before">?</div>
            <div class="card-after">
                <img src="${cardValues[i].image}" class="image"/>
            </div>
        </div>
        `
    }
    gameCon.style.gridTemplateColumns =  `repeat(${size}, auto)`;
}






const initializer = () => {
    result.textContent = ""
    wincount = 0;
    let cardValues = generateRandom()
    
    matrixGenerate(cardValues)
    cards = document.querySelectorAll('#card')
    cards.forEach((card) => card.addEventListener('click',()=>{

    
    if(flipped){
        return;
    }
    if(lockcard.includes(card)) {
        return;
    }
    if(card === firstcard) {
        return;
    }
    
    if(!hasFlippedcard){
        hasFlippedcard = true
        firstcard = card
        firstcard.classList.add('flip')
        firstAtt = card.getAttribute('data-framework')
        console.log(firstAtt)
    }
    else{
        hasFlippedcard = false
        secondcard = card
        secondcard.classList.add('flip')
        secondAtt = card.getAttribute('data-framework')
        console.log(secondAtt)
        flipped = true
    }
   
    setTimeout(()=>{
        if (flipped){

            if(firstAtt !== secondAtt){ //unSame images
                console.log('UnSame value')            
                firstcard.classList.remove('flip');
                secondcard.classList.remove('flip');
                firstcard = 0
                secondcard = 0
                firstAtt = 0
                secondAtt = 0
            }else{
                lockcard.push(firstcard,secondcard)
                console.log('Same value') //Same image
                firstcard = 0
                secondcard = 0
                firstAtt = 0
                secondAtt = 0
                moveCount += 1
                moves.innerHTML = `<span> Move : </span> ${moveCount}`

            }
            flipped = false
        }
    },1000)
    
}))
}

startButton.addEventListener('click', ()=>{
    moveCount = 0
    time = 0
    controls.classList.add('hide')
    stopButton.classList.remove('hide')
    startButton.classList.remove('hide')


    interval = setInterval(timeGenerate, 1000)

    moves.innerHTML = `<span> Move : </span> ${moveCount}`
    initializer()
})

stopButton.addEventListener('click', stopGame = () =>{
    controls.classList.remove('hide')
    stopButton.classList.add('hide')
    startButton.classList.remove('hide')
    clearInterval(interval)
    window.location.reload();
})

