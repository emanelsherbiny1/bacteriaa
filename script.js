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
const quizData = [
    {
        question: "Dermatophytosis commonly affects which tissues?",
        answers: [
            { text: "Keratinized tissues like hair, skin, claws", correct: true },
            { text: "Muscles and organs", correct: false },
            { text: "Blood vessels", correct: false },
            { text: "Bone marrow", correct: false }
        ],
        feedback: "ركّز يا دكتور! الإجابة دي غلط لأن Dermatophytosis عبارة عن فطريات سطحية (superficial fungi) بتعيش على Keratin فقط، يعني الشعر، الجلد، والأظافر. العضلات أو الأعضاء الداخلية مش بتتأثر."
    },
    {
        question: "Which species can dermatophytosis infect?",
        answers: [
            { text: "Dogs, Cats, Cattle, Humans", correct: true },
            { text: "Only Cats", correct: false },
            { text: "Only Humans", correct: false },
            { text: "Fish and Amphibians", correct: false }
        ],
        feedback: "لا يا دكتور! الإجابة دي مش صحيحة. Dermatophytosis عندها انتشار واسع وبتصيب Dogs, Cats, Cattle, Humans، وممكن تنتقل من الحيوانات للإنسان (zoonotic). مش مقتصرة على قطة أو إنسان بس."
    },
    {
    question: "Why can dermatophytosis persist on surfaces that resist other microorganisms?",
    answers: [
        { text: "Because the fungi use keratin as their main nutrient", correct: true },
        { text: "Because it multiplies in blood", correct: false },
        { text: "Because it produces toxins that kill bacteria", correct: false },
        { text: "Because it only grows in water", correct: false }
    ],
    feedback: "ركز يا دكتور! الإجابة دي غلط. الفطريات المسؤولة عن Dermatophytosis متخصصة على Keratin، يعني ممكن تعيش على الشعر، الجلد، والأظافر، وده اللي بيخليها تصمد على الأسطح اللي البكتيريا والفطريات التانية مش بتقدر تعيش عليها."
}
];

let currentQuestion = 0;

const questionText = document.getElementById("question-text");
const answerButtons = document.getElementById("answer-buttons");
const feedback = document.getElementById("feedback");
const celebration = document.getElementById("celebration");

function showQuestion() {
    feedback.innerText = "";
    celebration.style.display = "none";
    const q = quizData[currentQuestion];
    questionText.innerText = q.question;

    answerButtons.innerHTML = "";
    q.answers.forEach(answer => {
        const btn = document.createElement("button");
        btn.innerText = answer.text;
        btn.addEventListener("click", () => selectAnswer(answer));
        answerButtons.appendChild(btn);
    });
}

function selectAnswer(answer) {
    if(answer.correct) {
        celebration.style.display = "block"; // show celebration
        feedback.innerText = "";
        setTimeout(() => {
            currentQuestion++;
            if(currentQuestion < quizData.length){
                showQuestion();
            } else {
                questionText.innerText = "🎉 Congrats! You finished the quiz!";
                answerButtons.innerHTML = "";
                celebration.style.display = "none";
            }
        }, 1000); // الاحتفال لمدة ثانية قبل الانتقال
    } else {
        feedback.innerText = quizData[currentQuestion].feedback;
    }
}

showQuestion();