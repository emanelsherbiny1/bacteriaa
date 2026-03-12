document.getElementById("exploreBtn").onclick=function(){
    document.querySelector("#about").scrollIntoView({behavior:"smooth"});
};

document.querySelector("video").play().catch(()=>{});

const canvas = document.getElementById("bacteriaCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mouse = { x: canvas.width/2, y: canvas.height/2 };
window.addEventListener("mousemove", e=>{ mouse.x=e.clientX; mouse.y=e.clientY; });

class Bacteria{
    constructor(){
        this.x = Math.random()*canvas.width;
        this.y = Math.random()*canvas.height;
        this.size = Math.random()*3+1;
        this.speedX = (Math.random()-0.5)*0.5;
        this.speedY = (Math.random()-0.5)*0.5;
        this.life = Math.random()*200+100;
    }
    move(){
        this.x += this.speedX + (mouse.x-this.x)*0.0002;
        this.y += this.speedY + (mouse.y-this.y)*0.0002;
        this.life--;
    }
    draw(){
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
        ctx.fillStyle="rgba(0,255,166,0.6)";
        ctx.fill();
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.size*3,0,Math.PI*2);
        ctx.strokeStyle="rgba(0,255,166,0.08)";
        ctx.stroke();
    }
}

let bacteriaArray=[];
function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    if(bacteriaArray.length<120){ bacteriaArray.push(new Bacteria()); }
    bacteriaArray.forEach((b,i)=>{
        b.move();
        b.draw();
        if(b.life<=0) bacteriaArray.splice(i,1);
    });
    requestAnimationFrame(animate);
}
animate();
window.addEventListener("resize",()=>{ canvas.width=window.innerWidth; canvas.height=window.innerHeight; });
document.getElementById("exploreBtn").addEventListener("mouseenter",function(){
    this.style.transform="scale(1.1)";
});

document.getElementById("exploreBtn").addEventListener("mouseleave",function(){
    this.style.transform="scale(1)";
});