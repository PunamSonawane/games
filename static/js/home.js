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
    'win':0,
    'loss':0,
    'drew':0,
    'isStand':false,
    'turnOver':false,
}

const YOU= blackjackGame['you']
const DEALER= blackjackGame['dealer']

const hitSound= new Audio('../sound/swish.m4a')
const winSound= new Audio('../sound/cash.mp3')

const lossSound= new Audio('../sound/aww.mp3')


document.querySelector('#blackjack-hit-btn').addEventListener('click',blackjackHit)
document.querySelector('#blackjack-stand-btn').addEventListener('click',dealerLogic)
document.querySelector('#blackjack-deal-btn').addEventListener('click',blackjackDeal)

function blackjackHit(){
    if(blackjackGame['isStand']===false){
        let card=randomCard()
//console.log(card)
showCard(card,YOU)

updateScore(card,YOU)
showScore(YOU)

    }

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
        document.querySelector('#blackjack-result').textContent="Let's Play"
        document.querySelector('#blackjack-result').style.color='black'
        blackjackGame['turnOver']=true

    
    
    
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

function dealerLogic(){
    
    let card=randomCard();
    showCard(card,DEALER)
    updateScore(card,DEALER)
    showScore(DEALER)
    if(DEALER['score']>15){
        blackjackGame['turnOver']=true
        let winner=computeWinner()
        showResult(winner)
    }
       
}

function computeWinner(){
    let winner

    if(YOU['score']<=21){
        if(YOU['score']>DEALER['score']||(DEALER['score']>21)){
            blackjackGame['win']++
            winner=YOU
        }else if (YOU['score']<DEALER['score']){
            blackjackGame['loss']++
            winner=DEALER
        }else if(YOU['score']===DEALER['score']){
            console.log('you drew')
            blackjackGame['drew']++
        }
    }else if(YOU['score']>21 && DEALER['score']<=21){
        blackjackGame['loss']++
        winner=DEALER
    }else if(YOU['score']>21 && DEALER['score']>21){
        blackjackGame['drew']++
        console.log('you drew')
    }
    return winner
}

function showResult(winner){
    let message, messageColor

    
        if(winner===YOU){
            document.querySelector('#wins').textContent=blackjackGame['win']
            message='You Won!'
            messageColor='green'
            winSound.play()
        } else if(winner===DEALER){
            document.querySelector('#loss').textContent=blackjackGame['loss']
            message='You Lost!'
            messageColor='red'
            lossSound.play()
        }else{
            document.querySelector('#draw').textContent=blackjackGame['drew']
            message='You Drew!'
            messageColor='black'
        }
    
        document.querySelector('#blackjack-result').textContent=message
        document.querySelector('#blackjack-result').style.color=messageColor

    

    if(winner===YOU){
        document.querySelector('#win').textContent=blackjackGame['win']
        message='You Won!'
        messageColor='green'
        winSound.play()
    } else if(winner===DEALER){
        document.querySelector('#loss').textContent=blackjackGame['loss']
        message='You Lost!'
        messageColor='red'
        lossSound.play()
    }else{
        document.querySelector('#draw').textContent=blackjackGame['drew']
        message='You Drew!'
        messageColor='black'
    }

    document.querySelector('#blackjack-result').textContent=message
    document.querySelector('#blackjack-result').style.color=messageColor
}