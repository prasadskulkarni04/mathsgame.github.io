var playing=false;
var score;
var time;
var action;
var correctAnswer;
document.getElementById("startreset").onclick=function(){
    if(playing==true){
        location.reload();
    }
    else{
        playing=true;
        score=0;
        document.getElementById("scorevalue").innerHTML=score;
        show("timeremaining");
        time=60;
        document.getElementById("time").innerHTML=time;
        //hide game over
        hide("gameover");
        //start countdown
        startCountdown();
        document.getElementById("startreset").innerHTML="<strong>Reset Game</strong>";
        //generate new QA
        generateQA();
    }
}

//Clicking on Answer Box
for(i=1;i<5;i++){
    document.getElementById("box"+i).onclick=function(){
        //check if we are playing
        if(playing==true){
            if(this.innerHTML==correctAnswer){
                score += 1;
                document.getElementById("scorevalue").innerHTML=score;
                hide("wrong");
                show("correct");
                setTimeout(function(){
                    hide("correct");
                },1000)
                generateQA();
            }
            else{
                //wrong answer
                hide("correct");
                show("wrong");
                setTimeout(function(){
                    hide("wrong");
                },1000)
            }
        }
    }
}


function show(Id){
    document.getElementById(Id).style.display="block";
 }
function hide(Id){
    document.getElementById(Id).style.display="none";
 }
function startCountdown(){
    action=setInterval(function(){
        time -= 1;
        document.getElementById("time").innerHTML=time;
        if(time == 0){
            stopCountdown();
            show("gameover");
            document.getElementById("gameover").innerHTML="<p>Game Over!!!</p><p>your score is " + score + ".</p>";
            hide("timeremaining");
            hide("correct");
            hide("wrong");
            playing=false;
            document.getElementById("startreset").innerHTML="<strong>Start Game</strong>";
        }
    },1000)
}

function stopCountdown(){
    clearInterval(action);
 }

function generateQA(){
    var x=1+Math.round(9*Math.random());
    var y=1+Math.round(9*Math.random());
    correctAnswer=x*y; 
    document.getElementById("question").innerHTML = x + "x" + y;
    var correctPosition = 1+Math.round(3*Math.random());
    document.getElementById("box"+correctPosition).innerHTML=correctAnswer;
    //fill others with wrong answers
    var answers=[correctAnswer];
    for(i=1;i<5;i++){
        if(i != correctPosition){
            var wrongAnswer;
            do{
                wrongAnswer=(1+Math.round(9*Math.random()))*(1+Math.round(9*Math.random()));
            }
            while(answers.indexOf(wrongAnswer)>-1)
            document.getElementById("box"+i).innerHTML=wrongAnswer;
            answers.push(wrongAnswer);
        }
    }

}

//if we click on start/Reset
    //if we are playing
        //reload page
    //if we are not playing
        //set playing=true
        //set score to 0
        //show countdown box
        //reduce time by 1sec in loops
            //timeleft ?
                //yes- continue
                //no- gameover
        //change button to reset
        //generate new QA

//if we click on answer box
    //if we are playing
        //correct ?
            //yes
                //increase score by 1
                //show correct box for 1sec
                //generate new QA
            //no
                // show try again box for 1sec 