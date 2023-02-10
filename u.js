//---------------------------PROJET CONSOLE---------------------------
console.clear();
/**
 * 
 * @param {Number} delay
 * @param {Number} nb 
 */
function decompte(nb,delay=1000){
    if (nb<=0) {
        return;
    }
    setTimeout(()=>{
        console.log(nb);
        decompte(nb-1,delay);
    },delay);
}

var person={
    nom:"tsilavo",
    matricule:"2632",
    age:17,
    niveau:"L2"
}
function bonjour({nom,age,...rest}) {
    console.log("bonjour "+nom+" agé de "+age+" ans;");
    console.log(rest);
}


function wait(duration) {
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
            resolve(duration);
        },duration );
    })
}

function waitAndFail(duration) {
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
            reject(duration);
        },duration );
    })
}

async function b(){
    await wait(2000)
    console.log("hello");
    await wait(2000)
    console.log("Guys");
}
//---------------------------PROJET CONSOLE---------------------------

//---------------------------NAVBAR---------------------------
const ratio=.60;
var sections=document.querySelectorAll(".section");
var NavObserver=new IntersectionObserver((entries,observer)=>{
    entries.forEach(entry => {
        if(entry.isIntersecting){
            const id=entry.target.getAttribute("id").toString();
            //activate
            const link=document.querySelector(`a[href="#${id}"]`);
            document.querySelectorAll(".active").forEach(element => {
                element.classList.remove("active")
            });
            link.classList.add('active')
        }
    });
},{
    rootMargin: "-39% 0px -60% 0px"
    })
sections.forEach(section => {
    NavObserver.observe(section);
});
//---------------------------NAVBAR---------------------------








//animation mot par mot
// const mot=document.querySelector(".mot p").childNodes
// var motStr="";
// var motTab=[]; 
// mot.forEach((element,index) => {
//     if(element.textContent!=""){
//         (index!=mot.length-1) ? motStr+=element.textContent+" ":motStr+=element.textContent;
//     }
// });
// motTab=motStr.split(' ');
// motTab=motTab.map((element,indice)=>`<span><span style="animation-delay:${0.1*indice}s";>`+element+`</span></span>`)
// motStr="";
// motTab.forEach(element => {
//     motStr+=element+" ";
// });
// document.querySelector(".mot p").innerHTML=motStr;
// console.log(motStr);
var titleObs = new IntersectionObserver((entries)=>{
    entries.forEach(entry => {
        if(entry.isIntersecting){
            AnimateTitle(".mot p");
            titleObs.unobserve(entry.target)
        }
    });
},{
    threshold:.5
})
titleObs.observe(document.querySelector('.container-mot'))
var sp=0;
function AnimateTitle(selector){
    var title=document.querySelector(selector);;
    if(title==null){
        console.error("Imposiible de trouverl'élément"+selector);
    }
    const childrens=Array.from(title.childNodes);
    var elements= [];
    childrens.forEach(child => {
        if(child.nodeType == Node.TEXT_NODE){
            const motTab=child.textContent.split(' ');
            var spans=motTab.map(addSpanNode);
            spans = spans.map((span,indice)=>{
                            if(indice===spans.length-1)return[span]
                            return [span, document.createTextNode(' ')]
                        }).flat(1);
            elements=elements.concat(spans);
        }else{
            elements.push(child);
        }
    });
    title.innerHTML="";
    elements.forEach(el => {
       title.appendChild(el);
    });
}
/**
 * 
 * @param {*} word le mot dont on va ajouter un span  
 * @returns ajouter le mot en parametre entre deux spans
 */
function addSpanNode(word){
    const span=document.createElement("span");
    const span2=document.createElement("span");
    span2.style.animationDelay=(sp*0.2)+'s';  
    span.appendChild(span2);
    span2.innerHTML=word;
    sp++;
    return span;
}
//document.querySelectorAll('span span').forEach((element,index) => {
//    element.style.animationDelay=(index*0.1)+'s';
//});













//element moving on scroll
window.addEventListener('scroll',()=>{
    document.getElementById("d1").innerHTML=window.scrollY;
})
var Scroll = document.querySelector(".scroll");
var movable = document.querySelector(".movable");
var obserser = new IntersectionObserver((entries)=>{
    entries.forEach(entry => {
        if(entry.isIntersecting){
            movable.style.animation="move 1s ease-in-out forwards"
            obserser.unobserve(entry.target);
        }    
    });
},{
    threshold:.5
});
obserser.observe(Scroll);















var text = document.querySelector(".button-container .button span");
var txt = text.innerHTML;
text.innerHTML = "";
for(var i=0;i<txt.length;i++){
    text.innerHTML+=`<span style="transition:all ${0.08*i}s;">${txt.charAt(i)}</span>`;    
}











//cube 3D
var cube = document.querySelector(".conteneur")
var initPos = {x:0,y:0}
var rot = {x:0,y:0}
var initRot = {x:0,y:0}
var rotate = false;
var getInitPos = true;
cube.addEventListener("mousedown",start)
/**
 * 
 * @param {*} event pour recuperer la direction de mouvement de la souris 
 */
function start(event){
    rotate=true;
    initPos.x = event.clientX;
    initPos.y = event.clientY;
    onmousemove = function(e){
        rot.x = e.clientX-initPos.x
        rot.y = initPos.y-e.clientY
        onmouseup=stop;
        cube.onmouseout = stop;
        if(rotate)cube.style.transform = `rotateX(${-initRot.y+rot.y}deg) rotateY(${-initRot.x-rot.x}deg)`
    }
}
function stop(){
    rotate=false;
    initRot.x = rot.x
    initRot.y = rot.y
}
onscroll = loadCube
onload = loadCube

function loadCube(){
    if(this.document.querySelector(".cube-container").getBoundingClientRect().y<=400){
        cube.style.transform = `rotateY(${380*2}deg) rotateX(-20deg)`
        cube.style.marginLeft = "15%"
    }
}









//grabing box
var move = true;
var box=document.querySelectorAll(".box");
onmouseup = function(){move=false};
box.forEach(element => {
    element.addEventListener("mousedown",function(event){
    move=true;
    onmousemove = function(event){
                if(move){
                    element.style.left = event.clientX-element.getBoundingClientRect().width/2+"px";
                    element.style.top = event.clientY-element.getBoundingClientRect().height/2+"px";
                    if(element.getBoundingClientRect().left<=0){
                        element.style.left = "0%";
                    }
                    if(element.getBoundingClientRect().top<=0){
                        element.style.top = "0%";
                    }
                    if(element.getBoundingClientRect().top>=element.parentNode.getBoundingClientRect().height){
                        element.style.top = element.parentNode.getBoundingClientRect().height+"px";
                    }
                }
                this.onmouseup = function(){
                    move=false;
                }
            }
    });
});

