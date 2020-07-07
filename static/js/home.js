function ageInDays(){
    var birthyear=prompt("What is your birth year");
    var ageIndayss=(2020-birthyear)*365;
    
    var h1=document.createElement('h1');
    var textAnswer= document.createTextNode('You are ' + ageIndayss + ' days old');
    
    h1.setAttribute('id','ageIdDays');
    h1.appendChild(textAnswer);
    console.log(h1)
    document.getElementById('flex-box-result').appendChild(h1);
}

function rpsGame(yourChoice){
    console.log(yourChoice)
    var humanChoice, botChoice
    humanChoice=yourChoice.id
    botChoice=numberToChoice(randToRpsInt())
    console.log(botChoice)
    rpsFrontEnd(yourChoice.id,botChoice,message)
}

function randToRpsInt(){
    return Math.floor(Math.random()*3)
}

function numberToChoice(number){
    return ['rock','paper', 'scissors'][number]
}