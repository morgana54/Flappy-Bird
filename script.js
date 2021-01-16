const obstacle = document.getElementById("obstacle");
const hole = document.getElementById("hole")
const platypus = document.getElementById("platypus")
let jumping = 0;
let score = 0;

// Generate random hole
hole.addEventListener('animationiteration', () => {
    let random = -((Math.random()*370) + 130);
    hole.style.top = `${random}px`;
    score++; // add to score for beating the hole
})


// Make platypus jump
window.addEventListener("click", jump)


// Gravity
setInterval(() => {
    let platypusTop = 
    parseInt(window.getComputedStyle(platypus).getPropertyValue("top"));

    platypusTop += 3.5; // potem mozesz ogarnąć żeby spadał z przyspieszeniem
    if(jumping == 0) {
        platypus.style.top = `${platypusTop}px` 
    }
    if ((platypusTop > 463)) {
        alert("Game over! Score: " + score) // to zmienisz potem na po prostu jakiś swój custom alert (wyskakujący nowy div czy coś z wynikiem)
        platypus.style.top = 100 + "px";
        score = 0;
    }
    
}, 10)

function jump() {
    jumping = 1;
    let jumpCount = 0;
    let jumpInterval = setInterval(() => {
        let platypusTop = 
        parseInt(window.getComputedStyle(platypus).getPropertyValue("top"));
        if(platypusTop > 6)
        platypus.style.top = `${platypusTop-5}px`
        
        // Make it slower at the end (better gravity simulation)
        if(jumpCount > 10) {
            platypus.style.top = `${platypusTop-2}px`
        }
        if(jumpCount > 18) {
            clearInterval(jumpInterval);
            jumping = 0;
            jumpCount = 0;
        }
        jumpCount++;
    }, 10)
} 

