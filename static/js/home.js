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

function genrateCat(){
    var imge=document.createElement('img')
    var div=document.getElementById('flex-cat-add')
    imge.src="static/images/cat.jpg"
    div.appendChild(imge)

}