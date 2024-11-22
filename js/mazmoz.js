const s = document.querySelectorAll("Select");
const o = document.querySelectorAll("option");
const change = document.querySelectorAll(".changer");
const feal = document.querySelector("input");
const result = document.querySelector(".resultValue");
let s1 = Number;
let s2 = Number;
let s3 = Number;
let s4 = Number;
let randomizer1 = Number;
let randomizer2 = Number;
let randomizer3 = Number;
let randomizer4 = Number;

document.querySelector(".find").addEventListener("click", function(){
    if(s[0].value == "غائب"){
        s1 = 1;
    }
   
    if(s[0].value == "مخاطب"){
        s1 = 2;
    }
    
    if(s[0].value == "متكلّم"){
        s1 = 3;
    }    

    if(s[1].value == "مذكر"){
        s2 = 1;
    }
   
    if(s[1].value == "مؤنث"){
        s2 = 2;
    }
    
    if(s[2].value == "مفرد"){
        s3 = 1;
    }    

    if(s[2].value == "مثني" || s[2].value == "وحده"){
        s3 = 2;
    }      

    if(s[2].value == "جمع" || s[2].value == "مع الغير"){
        s3 = 3;
    }   

    if(s[3].value == "ماضي"){
        s4 = 1;
    }  

    if(s[3].value == "مضارع"){
        s4 = 2;
    }      

    if(s1 == 1 && s2 == 1 && s3 == 1 && s4 == 1){
        result.textContent = `هُوَ ${feal.value}َ`;
    }
    
    if(s1 == 1 && s2 == 1 && s3 == 1 && s4 == 2){
        result.textContent = `هُوَ یَ${feal.value}ُ`;
    }
    
    if(s1 == 1 && s2 == 1 && s3 == 2 && s4 == 1){
        result.textContent = `هُما ${feal.value}ا`;
    }
    
    if(s1 == 1 && s2 == 1 && s3 == 2 && s4 == 2){
        result.textContent = `هُما یَ${feal.value}انِ`;
    }
    
    if(s1 == 1 && s2 == 1 && s3 == 3 && s4 == 1){
        result.textContent = `هُم ${feal.value}ُوا`;
    }
    
    if(s1 == 1 && s2 == 1 && s3 == 3 && s4 == 2){
        result.textContent = `هُم یَ${feal.value}ونَ`;
    }
    
    if(s1 == 1 && s2 == 2 && s3 == 1 && s4 == 1){
        result.textContent = `هِیَ ${feal.value}تْ`;
    }
 
    if(s1 == 1 && s2 == 2 && s3 == 1 && s4 == 2){
        result.textContent = `هِیَ تَ${feal.value}ُ`;
    }
 
    if(s1 == 1 && s2 == 2 && s3 == 2 && s4 == 1){
        result.textContent = `هُما ${feal.value}َتا`;
    }
 
    if(s1 == 1 && s2 == 2 && s3 == 2 && s4 == 2){
        result.textContent = `هُما تَ${feal.value}انِ`;
    }
 
    if(s1 == 1 && s2 == 2 && s3 == 3 && s4 == 1){
        result.textContent = `هُنَّ ${feal.value}نَ`;
    }
 
    if(s1 == 1 && s2 == 2 && s3 == 3 && s4 == 2){
        result.textContent = `هُنَّ یَ${feal.value}نَ`;
    }
 
    if(s1 == 2 && s2 == 1 && s3 == 1 && s4 == 1){
        result.textContent = `اَنتَ ${feal.value}تَ`;
    }
 
    if(s1 == 2 && s2 == 1 && s3 == 1 && s4 == 2){
        result.textContent = `اَنتَ تَ${feal.value}ُ`;
    }
 
    if(s1 == 2 && s2 == 1 && s3 == 2 && s4 == 1){
        result.textContent = `اَنتُما ${feal.value}تُما`;
    }
 
    if(s1 == 2 && s2 == 1 && s3 == 2 && s4 == 2){
        result.textContent = `اَنتُما تَ${feal.value}انِ`;
    }
 
    if(s1 == 2 && s2 == 1 && s3 == 3 && s4 == 1){
        result.textContent = `اَنتُم ${feal.value}تُم`;
    }
 
    if(s1 == 2 && s2 == 1 && s3 == 3 && s4 == 2){
        result.textContent = `اَنتُم تَ${feal.value}ونَ`;
    }
 
    if(s1 == 2 && s2 == 2 && s3 == 1 && s4 == 1){
        result.textContent = `اَنتِ ${feal.value}تِ`;
    }
 
    if(s1 == 2 && s2 == 2 && s3 == 1 && s4 == 2){
        result.textContent = `اَنتِ تَ${feal.value}ینَ`;
    }
 
    if(s1 == 2 && s2 == 2 && s3 == 2 && s4 == 1){
        result.textContent = `اَنتُما ${feal.value}تُما`;
    }
 
    if(s1 == 2 && s2 == 2 && s3 == 2 && s4 == 2){
        result.textContent = `اَنتُما تَ${feal.value}انِ`;
    }
 
    if(s1 == 2 && s2 == 2 && s3 == 3 && s4 == 1){
        result.textContent = `اَنتُـنَّ ${feal.value}تُـنَّ`;
    }
 
    if(s1 == 2 && s2 == 2 && s3 == 3 && s4 == 2){
        result.textContent = `اَنتُـنَّ تَ${feal.value}نَ`;
    }
 
    if(s1 == 3 && s2 == 1 && s3 == 2 && s4 == 1){
        result.textContent = `اَنا ${feal.value}تُ`;
    }
 
    if(s1 == 3 && s2 == 1 && s3 == 2 && s4 == 2){
        result.textContent = `اَنا اَ${feal.value}ُ`;
    }
 
    if(s1 == 3 && s2 == 2 && s3 == 2 && s4 == 1){
        result.textContent = `اَنا ${feal.value}تُ`;
    }
 
    if(s1 == 3 && s2 == 2 && s3 == 2 && s4 == 2){
        result.textContent = `اَنا اَ${feal.value}ُ`;
    } 
 
    if(s1 == 3 && s2 == 1 && s3 == 3 && s4 == 1){
        result.textContent = `نَحنُ ${feal.value}نا`;
    } 
 
    if(s1 == 3 && s2 == 1 && s3 == 3 && s4 == 2){
        result.textContent = `نَحنُ نَ${feal.value}ُ`;
    } 
 
    if(s1 == 3 && s2 == 2 && s3 == 3 && s4 == 1){
        result.textContent = `نَحنُ ${feal.value}نا`;
    } 
 
    if(s1 == 3 && s2 == 2 && s3 == 3 && s4 == 2){
        result.textContent = `نَحنُ نَ${feal.value}ُ`;
    }
})

document.querySelector("body").addEventListener("click", function(){
    if(s[0].value == "متكلّم"){
        change[0].classList.add("hidden");
        change[1].textContent = "وحده";
        change[2].textContent = "مع الغير";

    } 
    else{
        change[0].classList.remove("hidden");
        change[1].textContent = "مثني";
        change[2].textContent = "جمع"; 
    }
})

document.querySelector(".randomize").addEventListener("click", function(){
    randomizer1 = Math.floor(Math.random() * 3) + 1;
    randomizer2 = Math.floor(Math.random() * 2) + 1;
    randomizer3 = Math.floor(Math.random() * 3) + 1;
    randomizer4 = Math.floor(Math.random() * 2) + 1;

    if(randomizer1 == 1){
        s[0].value = o[1].value;
    }
    
    if(randomizer1 == 2){
        s[0].value = o[2].value;
    }

    if(randomizer1 == 3){
        s[0].value = o[3].value;
    }
    
    if(randomizer2 == 1){
        s[1].value = o[5].value;
    }

    if(randomizer2 == 2){
        s[1].value = o[6].value;
    }

    if(randomizer3 == 3){
        s[2].value = o[8].value;
    }
    
    if(randomizer3 == 1){
        s[2].value = o[9].value;
    }

    if(randomizer3 == 2){
        s[2].value = o[10].value;
    }
    
    if(randomizer4 == 1){
        s[3].value = o[12].value;
    }

    if(randomizer4 == 2){
        s[3].value = o[13].value;
    }
})