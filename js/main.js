//게임만들기!!!!!
//1.화면에 네모, 원을 그릴수 있어야함
//2.프레임마다 코드를 실행할수 있어야함
//3.colision check할수 있어야함

//유닛 생성법

let canvas = document.querySelector('#canvas');
let ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;
let jump = false;
let jumptimer = 0;
let animation;
//공룡객체만들기
let dino = {
    x: 1000,
    y: 200,
    width: 50,
    height: 50,
    draw() {
        ctx.fillStyle = 'green';
        ctx.fillRect(this.x,this.y, this.width, this.height);
    }
}
dino.draw();
//애니메이션 만들기
//1초에 60번 실행함
let timer = 0;
//장애물 배열
let cactusArr = [];
function startFrame(){
    animation = requestAnimationFrame(startFrame);
    timer++;
    //캔버스 지우기
    ctx.clearRect(0,0,window.innerWidth, window.innerHeight);
    //여러개의 장애물을 움직이기
    if(timer % 200 === 0){
        let cactus = new Cactus();
        cactusArr.push(cactus);
    }
    cactusArr.forEach((item,index,arr)=>{
        //왼쪽으로 이동한 장애물은 제거하기
        //x좌표가 0보다작으면 제거 
        if(item.x < 500){
            arr.splice(index,1);
        }
        item.x--;
        item.draw();
        //충돌하는지 확인
        crashChech(dino,item);

    })
    //스페이스 눌렀을때 올라갔다 내려오기
    if(jump == true){
        dino.y--;
        jumptimer++;
    }else{
        if(dino.y < 200){ dino.y++; }
    }
    if(jumptimer > 100){
        jump = false;
        jumptimer = 0;
    }
    dino.draw();
}
startFrame();
//장애물 만들기
class Cactus {
    constructor(){
        this.x = 1500;
        this.y = 200;
        this.width = 50;
        this.height = 50;
    }
    draw(){
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x, this.y,this.width,this.height);
    }
}

//스페이스바 누르면 점프하기
document.addEventListener('keydown',function(e){
    if(e.code === 'Enter'){
        jump = true;
    }
})

//충돌확인
function crashChech(dino,cactus){
    let x축차이 = cactus.x - (dino.x + dino.width);
    let y축차이 = cactus.y - (dino.y + dino.height);
    if (x축차이 < 0 && y축차이 < 0){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        cancelAnimationFrame(animation);
    }
} 

