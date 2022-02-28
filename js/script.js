var comScoreElem = document.getElementById("computer-score");
var userScoreElem = document.getElementById("user-score");
var textElem = document.getElementById("text");

//오브젝트로 만들기
//컴퓨터 오브젝트
var computer = {
    score: 0,
    precent2: 0.5,
    percent3: 0.3, 
}
//사용자 오브젝트
var user = {
    score: 0,
    precent2: 0.5,
    percent3: 0.3, 
}
//게임 오브젝트
var game = {
    isComputerTrun: true,
    shotsleft: 15,
}
//글자변경되는 함수
function showText(s){
    textElem.innerHTML = s;
}
//점수판에 점수변경되는 함수
function updateScore(score, mal){
    if(mal==0){
        computer.score += score;
        comScoreElem.innerHTML = computer.score;
    }else {
        user.score += score;
        userScoreElem.innerHTML = user.score;
    }
    
}
//버튼 안보이게 하는 함수
function disableComputerButtons(flag){
    var computerButton = document.getElementsByClassName("btn-computer");
    for(var i=0; i<computerButton.length; i++){
        computerButton[i].disabled = flag;
    }
}
function disableUserButtons(flag){
     var userButton = document.getElementsByClassName("btn-user");
    for(var i=0; i<userButton.length; i++){
        userButton[i].disabled = flag;
    }
}
function onComputerShoot() {
    
    if(!game.isComputerTrun)
    return;
    var shootType;
    shootType = Math.random() < 0.5 ? 2:3;
   
    if(Math.random() < computer['percent'+shootType]){
            // 2점슛 50%확률로 성공
            showText('컴퓨터가 '+shootType+ '점슛을 성공시켰습니다!');
            updateScore(shootType,0);
           
    }else {
            // 실패시
            showText('컴퓨터가 '+ shootType+'점슛을 실패했습니다.');
    }
     
   game.isComputerTrun = false;
   disableComputerButtons(true);
    disableUserButtons(false);
   
}
function onUserShoot(jum){
    if(game.isComputerTrun)
    return;
   
    if(Math.random() < user['percent'+jum]){
            //50%센트 확률로 성공
            showText('당신이 '+ jum +'점 슛을 성공시켰습니다.');
             updateScore(3,2);
    }else{
             showText('당신이 '+jum+'점 슛을 실패했습니다.');
    }
    game.isComputerTrun = true;
    disableComputerButtons(false);
    disableUserButtons(true);
    gameTurn();
}
function gameTurn(){
    game.shotsleft--;
    document.getElementById("shorts-left").innerHTML = game.shotsleft;
    if(game.shotsleft==0){
        if(user.score>computer.score){
            showText('승리했습니다.');
        }else if(user.score < computer.score){
           showText('졌습니다.');
        }else{
           showText('비겼습니다.');
        }
        disableComputerButtons(true);
    }
}
