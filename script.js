const canvas = document.getElementById("drawCanvas");
const ctx = canvas.getContext("2d");

const drawingScreen = document.getElementById("drawingScreen");
const gameScreen = document.getElementById("gameScreen");

const petImage = document.getElementById("petImage");

const penBtn = document.getElementById("penBtn");
const eraserBtn = document.getElementById("eraserBtn");

const colorPicker = document.getElementById("colorPicker");
const sizeSlider = document.getElementById("sizeSlider");

const finishBtn = document.getElementById("finishBtn");

let drawing = false;

let currentColor = "#000000";
let currentSize = 5;

let erase = false;

// 캔버스 흰색 배경
ctx.fillStyle = "white";
ctx.fillRect(0,0,canvas.width,canvas.height);

ctx.lineCap="round";
ctx.lineJoin="round";

function getPos(e){

const rect = canvas.getBoundingClientRect();

let x,y;

if(e.touches){

x=e.touches[0].clientX-rect.left;
y=e.touches[0].clientY-rect.top;

}else{

x=e.clientX-rect.left;
y=e.clientY-rect.top;

}

x*=canvas.width/rect.width;
y*=canvas.height/rect.height;

return {x,y};

}

function startDraw(e){

drawing=true;

const pos=getPos(e);

ctx.beginPath();

ctx.moveTo(pos.x,pos.y);

}

function draw(e){

if(!drawing) return;

e.preventDefault();

const pos=getPos(e);

ctx.lineWidth=currentSize;

if(erase){

ctx.strokeStyle="white";

}else{

ctx.strokeStyle=currentColor;

}

ctx.lineTo(pos.x,pos.y);

ctx.stroke();

}

function endDraw(){

drawing=false;

}

canvas.addEventListener("mousedown",startDraw);
canvas.addEventListener("mousemove",draw);
window.addEventListener("mouseup",endDraw);

canvas.addEventListener("touchstart",startDraw);
canvas.addEventListener("touchmove",draw,{passive:false});
window.addEventListener("touchend",endDraw);

penBtn.onclick=()=>{

erase=false;

}

eraserBtn.onclick=()=>{

erase=true;

}

colorPicker.oninput=e=>{

currentColor=e.target.value;

}

sizeSlider.oninput=e=>{

currentSize=e.target.value;

}

finishBtn.onclick=()=>{

const image=canvas.toDataURL("image/png");

localStorage.setItem("petImage",image);

petImage.src=image;

drawingScreen.classList.add("hidden");

gameScreen.classList.remove("hidden");

}

// 실행 시 저장 확인

const saved=localStorage.getItem("petImage");

if(saved){

petImage.src=saved;

drawingScreen.classList.add("hidden");

gameScreen.classList.remove("hidden");

}