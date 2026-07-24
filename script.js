///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ELEMENTOS HTML
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const titulo = document.getElementById("titulo");
const subtitulo = document.getElementById("subtitulo");
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
const cards = document.querySelectorAll(".card");

const fairy = document.getElementById("fairy");
const fairyCanvas =document.getElementById("fairyCanvas");
const fairyCtx =fairyCanvas.getContext("2d");

const developerCard =document.querySelector(".developer");
const developerPage =document.getElementById("developer-page");
const designerCard = document.querySelector(".designer");
const designerPage = document.getElementById("designer-page");
const backButton =document.querySelectorAll(".back-button");

const tapes =document.querySelectorAll(".vhs");
const previewTitle =document.getElementById("preview-title");
const previewDescription =document.getElementById("preview-description");
const previewVideo =document.getElementById("preview-video");
const previewScreen =document.getElementById("preview-screen");
const tagsContainer =document.getElementById("preview-tags");
tagsContainer.innerHTML = "";
const firstTape = tapes[0];
firstTape.classList.add("active");
if(firstTape){
    const tags =
    firstTape.dataset.tags.split(",");
    tagsContainer.innerHTML = "";
    tags.forEach(tag => {
        const element =
        document.createElement("span");
        element.classList.add("tag");
        element.textContent = tag;
        tagsContainer.appendChild(element);
    });
}

const projectCards =document.querySelectorAll(".project-card");
const projectViewer =document.getElementById("project-viewer");
const viewerTitle =document.getElementById("viewer-title");
const viewerDescription =document.getElementById("viewer-description");
const viewerVideo =document.getElementById("viewer-video");
const viewerTags =document.getElementById("viewer-tags");
const viewerLink =document.getElementById("viewer-itch");
const viewerImage1 =document.getElementById("viewer-image1");
const viewerImage2 =document.getElementById("viewer-image2");
const viewerImage3 =document.getElementById("viewer-image3");
const projectWindow =document.getElementById("project-window");
const projectContent =document.getElementById("project-window-content");


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// VARIABLES
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
let fairyX = window.innerWidth/2;
let fairyY = window.innerHeight/2;
let mouseX = fairyX;
let mouseY = fairyY;
let lastMouseX = mouseX;
let lastMouseY = mouseY;

const particles = [];
const fairyTrail = [];

let mouse = {
    x:0,
    y:0
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// EVENTOS
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
if (window.innerWidth > 768) {
    cards.forEach(card => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const rotateY = (x - rect.width / 2) / 15;
            const rotateX = -(y - rect.height / 2) / 15;
            card.style.transform = `
                translateY(-40px)
                scale(1.12)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
            `;
        });
        card.addEventListener("mouseleave", () => {
            const initialRotation =
                card.classList.contains("developer")
                ? -8
                : 8;
            card.style.transform = `
                translateY(0)
                scale(1)
                rotate(${initialRotation}deg)
            `;
        });
    });
}



window.addEventListener("mousemove",(e)=>{
    mouse.x = e.clientX;
    mouse.y = e.clientY;

    mouseX = e.clientX;
    mouseY = e.clientY;
});

backButton.forEach(button => {
    button.addEventListener("click", () => {
        location.reload();
    });
});

developerCard.addEventListener("click",()=>{
    developerCard.classList.add("launch");
    setTimeout(()=>{
        transitionScreen.classList.add("wipe");
    },500);
    setTimeout(()=>{

        document.getElementById("selector")
        .style.display = "none";
        document.getElementById("intro")
        .style.display = "none";
        developerPage.classList.add("active");
    },1100);
});

window.addEventListener("resize", resizeCanvas);

tapes.forEach(tape => {
    tape.addEventListener("mouseenter", () => {
        tapes.forEach(t =>
            t.classList.remove("active")
        );
        tape.classList.add("active");

        previewScreen.classList.remove(
            "screen-glow"
        );
        void previewScreen.offsetWidth;
        previewScreen.classList.add(
            "screen-glow"
        );

        previewTitle.textContent =
        tape.dataset.title;
        previewDescription.textContent =
        tape.dataset.description;
        previewVideo.src =
        tape.dataset.video;
        previewVideo.load();
        previewVideo.play();
        tagsContainer.innerHTML = "";
        const tags =
        tape.dataset.tags.split(",");
        tags.forEach(tag => {
            const element =
            document.createElement("span");
            element.classList.add("tag");
            element.textContent = tag;
            tagsContainer.appendChild(
                element
            );
        });
        previewScreen.classList.remove(
            "screen-change"
        );
        void previewScreen.offsetWidth;
        previewScreen.classList.add(
            "screen-change"
        );
    });
});


projectCards.forEach(card => {
    const video =
    card.querySelector("video");
    card.addEventListener("mouseenter",()=>{
        video.play();
    });
    card.addEventListener("mouseleave",()=>{
        video.pause();
        video.currentTime = 0;
    });
});
projectCards.forEach(card=>{
    card.querySelector(".project-button")
    .addEventListener("click",()=>{
        viewerTitle.textContent =
        card.dataset.title;
        viewerDescription.textContent =
        card.dataset.long;
        console.log(viewerDescription.textContent);
        viewerVideo.src =
        card.dataset.video;
        viewerLink.onclick = () => {
            window.open(
                card.dataset.link,
                "_blank"
            );
        };
        viewerTags.innerHTML="";
        card.dataset.tags
            .split(",")
            .forEach(tag=>{
                const span =
                document.createElement("span");
                span.classList.add("tag");
                span.textContent = tag;
                viewerTags.appendChild(span);
            });
        projectViewer.classList.add("active");
        viewerVideo.src =card.dataset.video;
        viewerImage1.src =card.dataset.image1;
        viewerImage2.src = card.dataset.image2;
        viewerImage3.src = card.dataset.image3;
    });
    viewerLink.onclick = () => {
        window.open(card.dataset.link, "_blank");
    };
});
projectViewer.addEventListener("click",(e)=>{
    if(e.target === projectViewer){
        projectViewer.classList.remove("active");
    }

    card.style.transform =
    "scale(.97)";
    setTimeout(()=>{
        card.style.transform="";
    },150);



});

//lo siguiente no va, borrar si me canso
projectWindow.addEventListener("mousemove",(e)=>{
    const rect =
    projectWindow.getBoundingClientRect();
    const x =
    e.clientX - rect.left;
    const y =
    e.clientY - rect.top;
    projectContent.style.setProperty(
        "--mouse-x",
        `${x}px`
    );
    projectContent.style.setProperty(
        "--mouse-y",
        `${y}px`
    );
});
const media =
document.getElementById("viewer-media");
projectWindow.addEventListener("mousemove",(e)=>{
    const rect =
    projectWindow.getBoundingClientRect();
    const x =
    (e.clientX-rect.left)/rect.width-0.5;
    const y =
    (e.clientY-rect.top)/rect.height-0.5;
    media.style.transform=
    `
    translate(${x*10}px,${y*10}px)
    `;
});
projectWindow.addEventListener("mouseleave",()=>{
    media.style.transform="translate(0,0)";
});


designerCard.addEventListener("click",()=>{
    designerCard.classList.add("launch");
    setTimeout(()=>{
        transitionScreen.classList.add("wipe");
    },500);
    setTimeout(()=>{

        document.getElementById("selector")
        .style.display = "none";
        document.getElementById("intro")
        .style.display = "none";
        designerPage.classList.add("active");
    },1100);
});


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// FUNCIONES UI
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function updateFairy(){
    fairyX += (mouseX - fairyX) * 0.08;
    fairyY += (mouseY - fairyY) * 0.08;
    fairy.style.left = fairyX + "px";
    fairy.style.top = fairyY + "px";
    const moving =
    Math.abs(mouseX - lastMouseX) > 2 ||
    Math.abs(mouseY - lastMouseY) > 2;
    if(moving){
        fairyTrail.push(
            new FairyParticle(fairyX,fairyY)
        );
    }
    if(fairyTrail.length > 70){
        fairyTrail.shift();
    }
    lastMouseX = mouseX;
    lastMouseY = mouseY;
    requestAnimationFrame(updateFairy);

}

function escribir(elemento, texto, velocidad){
    let i = 0;
    let intervalo = setInterval(()=>{
        elemento.textContent =
            texto.substring(0,i);
        i++;
        if(i > texto.length){
            clearInterval(intervalo);
        }
    },velocidad);
}

function resizeCanvas(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    fairyCanvas.width =
    window.innerWidth;

    fairyCanvas.height =
    window.innerHeight;
}

function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    fairyCtx.clearRect(
    0,
    0,
    fairyCanvas.width,
    fairyCanvas.height
    );
    particles.forEach(p=>{
        p.update();
        p.draw();
    });
    fairyTrail.forEach((particle,index)=>{
        particle.update();
        particle.draw();
        if(particle.life <= 0){
            fairyTrail.splice(index,1);
        }
    });    
    requestAnimationFrame(animate);
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// CLASES
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
class Particle{

    constructor(){

        this.x = Math.random() * canvas.width;

        this.y = Math.random() * canvas.height;

        this.size = Math.random()*4 +0.5;

        this.isStar = Math.random() < 0.35;

        this.speedY = Math.random()*0.4 + 0.2;

        this.opacity = Math.random();

        this.fadeSpeed = Math.random()*0.02 + 0.005;

        if(this.isStar){

            this.size = this.size + 1.0;

        }
    }

    draw(){
        ctx.shadowBlur = 12;

        ctx.shadowColor = "#8cc8ff";

        ctx.fillStyle = `rgba(180,220,255,${this.opacity})`;
        if(this.isStar){

            this.drawStar();

        }else{

            ctx.beginPath();

            ctx.arc(this.x,this.y,this.size,0,Math.PI*2);

            ctx.fill();

        }

        ctx.shadowBlur = 0;

    }

    drawStar(){

        ctx.beginPath();

        ctx.moveTo(this.x, this.y-this.size);

        ctx.lineTo(this.x+this.size/4,this.y-this.size/4);

        ctx.lineTo(this.x+this.size,this.y);

        ctx.lineTo(this.x+this.size/4,this.y+this.size/4);

        ctx.lineTo(this.x,this.y+this.size);

        ctx.lineTo(this.x-this.size/4,this.y+this.size/4);
        
        ctx.lineTo(this.x-this.size,this.y);

        ctx.lineTo(this.x-this.size/4,this.y-this.size/4);

        ctx.closePath();

        ctx.fill();

    }

    update(){
        this.y -= this.speedY;
        if(this.y < -10){
            this.y = canvas.height + 10;
            this.x = Math.random()*canvas.width;
        }

        this.opacity += this.fadeSpeed;
        if(this.opacity >= 1 || this.opacity <= 0.2){
            this.fadeSpeed *= -1;
        }
        let dx = this.x - mouse.x;
        let dy = this.y - mouse.y;
        let distance = Math.sqrt(dx*dx + dy*dy);

        if(distance < 80){
            this.x += dx * 0.01;
            this.y += dy * 0.01;
        }
    }
}

class FairyParticle{

    constructor(x,y){

        this.x = x;

        this.y = y;

        this.size = Math.random()*4 + 2;
        this.star = Math.random() < 0.65;
        this.life = 1;

        this.speedX = (Math.random()-0.5)*2;

        this.speedY = -Math.random()*1.5;
        if(this.star){

            this.size = this.size + 1.0;

        }
    }

    draw(){


        fairyCtx.fillStyle = `rgba(200,230,255,${this.life})`;

        if(this.star){

            this.drawStar();

        }else{

            fairyCtx.beginPath();

            fairyCtx.arc(this.x,this.y,this.size,0,Math.PI*2);

            fairyCtx.fill();

        }

    }
    drawStar(){
        fairyCtx.beginPath();
        fairyCtx.moveTo(this.x, this.y-this.size);
        fairyCtx.lineTo(this.x+this.size/4,this.y-this.size/4);
        fairyCtx.lineTo(this.x+this.size,this.y);
        fairyCtx.lineTo(this.x+this.size/4,this.y+this.size/4);
        fairyCtx.lineTo(this.x,this.y+this.size);
        fairyCtx.lineTo(this.x-this.size/4,this.y+this.size/4);
        fairyCtx.lineTo(this.x-this.size,this.y);
        fairyCtx.lineTo(this.x-this.size/4,this.y-this.size/4);
        fairyCtx.closePath();
        fairyCtx.fill();
    }

    update(){

        this.x += this.speedX;

        this.y += this.speedY;

        this.life -= 0.02;

    }

}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// INICIALIZACIÓN
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const textoTitulo =
window.innerWidth <= 600
? "Hola, soy\nMiguel"
: "Hola, soy Miguel";

escribir(titulo, textoTitulo, 100);

setTimeout(() => {

    escribir(subtitulo, "Game Developer & Designer", 50);

}, 2200);

resizeCanvas();

for(let i=0;i<100;i++){
    particles.push(new Particle());
}

animate();
updateFairy();

openPage(developerCard, developerPage);
openPage(designerCard, designerPage);
openPage(gameDesignerCard, gameDesignerPage);

