//---------------Game 1 ----------------------
// function to get humanchoice and botchoice
function rpsGame(yourChoice){
    console.log(yourChoice)
    var humanChoice, botChoice
    humanChoice=yourChoice.id
    
    botChoice=numberToChoice(randToRpsInt())
    console.log('computerchoice:', botChoice)
    
    results=decideWinner(humanChoice, botChoice)
    console.log('results',results)

    message= finalMessage(results)
    console.log(message)
    
    rpsFrontEnd(yourChoice.id,botChoice,message)
}

// random choice genrator
function randToRpsInt(){
    return Math.floor(Math.random()*3)
}

// random number to choice converter
function numberToChoice(number){
    return ['rock','paper', 'scissors'][number]
}

// decide the winner as per human choice and botchoice
function decideWinner(yourChoice, computerChoice){
    var rpsDatabase={
        'rock':{'scissors':1,'rock':0.5,'paper':0},
        'paper':{'rock':1,'paper':0.5,'scissors':0},
        'scissors':{'paper':1,'scissors':0.5,'rock':0}
    }

    var yourScore= rpsDatabase[yourChoice][computerChoice]
    var computerScore=rpsDatabase[computerChoice][yourChoice]

    return [yourScore, computerScore]
}

// display the final output messages
function finalMessage([yourScore, computerScore]){
    if(yourScore===0){
        return {'message':'You lost!', 'color':'red'}
    }else if(yourScore===0.5){
        return {'message':'You tied!', 'color':'yellow'}
    }else {
        return {'message':'You won!', 'color':'green'}
    }
    
    
}

// change the front end as per the result
function rpsFrontEnd(humanImageChoice, botImageChoice, finalMessage){
    var imageDatabase={
        'rock':document.getElementById('rock').src,
        'paper':document.getElementById('paper').src,
        'scissors':document.getElementById('scissors').src,
    }

    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissors').remove();

    var humanDiv= document.createElement('div')
    var botDiv=document.createElement('div')
    var messageDiv=document.createElement('div')
    

    humanDiv.innerHTML="<img src='" + imageDatabase[humanImageChoice] +" 'height=150 style='box-shadow:0px 10px 50px rgba(37, 50, 233, 1)'>"
    messageDiv.innerHTML="<h1 style='color:" + finalMessage['color']+";font-size:60px; padding: 30px;'>" + finalMessage['message'] + "</h1>"
    botDiv.innerHTML="<img src='" + imageDatabase[botImageChoice] +"' height=150 style='box-shadow:0px 10px 50px rgba(243, 38, 24, 1)'>"
    

    document.getElementById('flex-box-rps-div').appendChild(humanDiv)
    document.getElementById('flex-box-rps-div').appendChild(messageDiv)
    document.getElementById('flex-box-rps-div').appendChild(botDiv)
    
} 

//---------------------Game 2 ------------------------

let blackjackGame={
    'you':{'scoreSpan':'#your-blackjack-result','div':'#your-box','score':0},
    'dealer':{'scoreSpan':'#dealer-blackjack-result','div':'#dealer-box', 'score':0},
    'cards':['2','3','4','5','6','7','8','9','10','k','J','Q','A'],
    'cardMap':{'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'k':10,'J':10,'Q':10,'A':[1,11]},
}

const YOU= blackjackGame['you']
const DEALER= blackjackGame['dealer']

const hitSound= new Audio('../sound/swish.m4a')

document.querySelector('#blackjack-hit-btn').addEventListener('click',blackjackHit)
document.querySelector('#blackjack-deal-btn').addEventListener('click',blackjackDeal)

function blackjackHit(){
let card=randomCard()
//console.log(card)
showCard(card,DEALER)

updateScore(card,DEALER)
showScore(DEALER)
}

function randomCard(){
    let randomIndex=Math.floor(Math.random()*13)
    return blackjackGame['cards'][randomIndex]
}

function showCard(card,activePlayer){
    if(activePlayer['score']<=21){
    let cardImage=document.createElement('img')
    cardImage.src=`../images/${card}.png`
    document.querySelector(activePlayer['div']).appendChild(cardImage)
    hitSound.play()
    }
}

//clear the cards (reset)
function blackjackDeal(){
    let yourImages= document.querySelector("#your-box").querySelectorAll('img')
    let dealerImages= document.querySelector("#dealer-box").querySelectorAll('img')
   for(i=0;i<yourImages.length;i++){
        yourImages[i].remove();
    } 

    for(i=0;i<dealerImages.length;i++){
        dealerImages[i].remove();
    } 
    console.log(yourImages)
    YOU['score']=0
    DEALER['score']=0
    document.querySelector('#your-blackjack-result').textContent=0
    document.querySelector('#dealer-blackjack-result').textContent=0
    document.querySelector('#your-blackjack-result').style.color='#ffffff'
    document.querySelector('#dealer-blackjack-result').style.color='#ffffff'
}

function updateScore(card, activePlayer){
if(card==='A')
{
    if (activePlayer['score'] + blackjackGame['cardMap'][card][1]<=21){
        activePlayer['score']+=blackjackGame['cardMap'][card][1]
        console.log(activePlayer['score'])
    }else{
        activePlayer['score']+=blackjackGame['cardMap'][card][0]
        console.log(activePlayer['score'])
    }
}else{
    activePlayer['score']+=blackjackGame['cardMap'][card]
    console.log(activePlayer['score'])
}


}

function showScore(activePlayer){
    if(activePlayer['score']>21){
        document.querySelector(activePlayer['scoreSpan']).textContent='Burst!'
        document.querySelector(activePlayer['scoreSpan']).style.color='Red'
    }else{
    document.querySelector(activePlayer['scoreSpan']).textContent=activePlayer['score']
    }
}