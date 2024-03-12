
const levelElement = document.getElementById("level")
const gameGrid = document.getElementById("gameGrid")
const message = document.getElementById("message")
console.log(gameGrid)
console.log(message)
console.log(levelElement)


let cards = []
let cardValues = []
let level = 1
let cardFlipped = false
let firstCard, secondCard
let pairsMatched = 0

function createCards(numPairs) {
    for (let i = 1; i <= numPairs; i++) {
        cardValues.push(i);
        cardValues.push(i);
    }
    cardValues.sort(() => Math.random() - 0.5);

    for (let i = 0; i < numPairs * 2; i++) {
        const card = document.createElement('div')
        card.classList.add('card')
        card.dataset.value = cardValues[i]
        card.textContent = '?'
        card.addEventListener('click', flipCard)
        gameGrid.appendChild(card)
        cards.push(card)
    }
}

function flipCard() {
    if (this == firstCard) return;
    this.textContent = this.dataset.value
    this.classList.add('flipped')
    if (!cardFlipped) {
        cardFlipped = true
        firstCard = this
        return
    }
    secondCard = this
    checkMatch()
}

function checkMatch() {
    if (firstCard.dataset.value === secondCard.dataset.value) {
        disableCards()
        pairsMatched++
        if (pairsMatched === level) {
            level++
            levelElement.textContent = level
            resetGame()
        }
    } else {
        unflipCards()
    }
    resetCards()
}

function disableCards() {
    firstCard.classList.add('matched')
    secondCard.classList.add('matched')
    firstCard.removeEventListener('click', flipCard)
    secondCard.removeEventListener('click', flipCard)

}

function unflipCards() {
    setTimeout(() => {
        firstCard.textContent = '?'
        secondCard.textContent = '?'
        firstCard.classList.remove('flipped')
        secondCard.claasList.remove('flipped')
    }, 1000)
}

function resetCards(){
    cardFlipped=false
    firstCard=null
    secondCard=null
}

function resetGame(){
    setTimeout(() =>{
        cards.forEach(card=>card.remove())
        cards=[]
        cardValues=[]
        pairsMatched=0
        createCards(level)
    },1000)
}

function startGame(){
    if(level===1){createCards(level)}
    else{resetGame()}
    message.textContent=''
}

document.addEventListener('DOMContentLoaded', function() {
startGame()
})
