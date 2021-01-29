const obstacle = document.getElementById("obstacle");
const hole = document.getElementById("hole")
const platypus = document.getElementById("platypus")

const state = {
    jumping: 0,
    score: 0,
    fallCount: 0
}

// Generate random hole
hole.addEventListener('animationiteration', () => {
    randomHole(hole)
    state.score++; // add to score for beating the hole
})

// Make platypus jump
window.addEventListener("keydown", jump) 

// Start the game
window.addEventListener("click", startGame) // Later after asking Kacper make some distinct buttons to be pressed to call this function

// Gravity
setInterval(() => { 
    let platypusTop = parseInt(window.getComputedStyle(platypus).getPropertyValue("top"));

    // Acceleration 
    if(state.fallCount > 50) {
        platypusTop += 5;
    } else if(state.fallCount > 25) {
        platypusTop += 4;
    } else {
        platypusTop += 3; 
    }

    // If platypus is not jumping at the moment make him fall down
    if(state.jumping == 0) {
        platypus.style.top = `${platypusTop}px` 
    }

    if ((platypusTop > 485) || (intersects(platypus, obstacle) && !containsInHeight(platypus, hole))) {
        alert("Game over! Score: " + state.score) // Alert stopuje wszystko z js na stronie!!
        platypus.style.top = 100 + "px";
        obstacle.style.animation = "none";
        hole.style.animation = "none";
        state.score = 0;
        state.fallCount = 0;
        
        
        // Restart animation after alert has been closed
        setTimeout(() => {
            // document.getElementById('alert').style.display = 'flex'
            obstacle.style.animation = "obstacle 4s linear infinite";
            hole.style.animation = "obstacle 4s linear infinite";
            randomHole(hole)
        }, 10)
    }

    // console.log(getComputedStyle(obstacle).getPropertyValue("left"))

    state.fallCount++;
    updateScore()
}, 10)

function jump() {
    state.jumping = 1; // Stop platypus from falling down
    let jumpCount = 0;
    platypus.style.transform = 'rotate(-18deg)' // More realistic jump
    let jumpInterval = setInterval(() => {
        let platypusTop = 
        parseInt(window.getComputedStyle(platypus).getPropertyValue("top"));
        if(platypusTop > 6)
        platypus.style.top = `${platypusTop-5}px`
       
        // Make it slower at the end (better gravity simulation)
        if(jumpCount > 14) {
            platypus.style.top = `${platypusTop-2}px`
        }
        if(jumpCount > 26) {
            platypus.style.transform = 'none'
            clearInterval(jumpInterval);
            state.jumping = 0;
            jumpCount = 0;
        }
        jumpCount++;
        state.fallCount = 0;
    }, 10)
} 

function randomHole(element) {
    let random = -((Math.random()*325) + 175); // Random number from -175 to -500
    element.style.top = `${random}px`;
}

function updateScore() {
    let scoreBox = document.getElementById("score")
    scoreBox.innerHTML = `Score: ${state.score}`
}

// returns true or false depening on whether elements intersect or not
function intersects(elemA, elemB) {
   
    // use 'left' and 'width' property to determine this
    let leftB = parseInt(window.getComputedStyle(elemB).getPropertyValue("left"));
    let widthA = parseInt(window.getComputedStyle(elemA).getPropertyValue("width"));

    return leftB <= widthA ? true : false
}

// returns true or false (but specifically for two elements used in function call)
function containsInHeight(elemA, elemB) {
    
    let topA = parseInt(window.getComputedStyle(elemA).getPropertyValue("top"));
    let topB = parseInt(window.getComputedStyle(elemB).getPropertyValue("top"));
    let heightA = parseInt(window.getComputedStyle(elemA).getPropertyValue("height"));
    let heightB = parseInt(window.getComputedStyle(elemB).getPropertyValue("height"));

    // Make the counting start point the same as the character's one (uzgodnienie height hole'a z tych 500px)
    topB = topB + 500 

    return ((topA > topB) && (topA + heightA < topB + heightB)) ? true : false
}

function startGame() {
    document.getElementById('alert').style.display = 'none'
}


// /* DODAWAĆ TEŻ JAKIEŚ FAJNE ANIMACJE I LEPSZE STYLE DO TEJ GRY ŻEBY BYŁA ŻYWA!!!!!!!!!!!!!!!!!!!!!!! transition properties 
// CURRENT TASK: figure out how to make (using Timeout and after watching videos and talking with Kacper) start screen reappear and freeze the game until mouse is clicked
// - make nice animation of hiding the box, and after animation is done: start the game (so the interval)
// stop the heading animation after start of the game
// - dodać instrukcję grania krótką
// - custom alert na koniec pokazujący wynik i game over
// - dodać animację umierającego dziobaka (np. nagle clearujesz interwały i potem odpalasz jakąś animację z css --> ale najpierw spytaj Kacpra co sądzi o twoich pomysłach, żbey efektywnie pracować)
//   // // - poziom trudności: ZAPYTAĆ KACPRA NAJPIERW BO TOBIE COŚ NIE SZŁO!!!!! a on pewnie wie od razu
//     // // - zmniejszać dziury lekko co jakiś score
//     // // - przyspieszać lekko animację co jakiś score!!

//     // // Increase level of diffculty
//     // if(state.score > 1) {
//     //     obstacle.style.animation = "obstacle 3s linear infinite";
//     //     hole.style.animation = "obstacle 3s linear infinite";
//     //     hole.style.height = 155 + 'px'
//     // }

// // WZÓR NA PISANIE GIER OD KACPRA
// // const state = {}

// // function gameloop() {
// //     state = update(state)
// //     render(state)
// // }

// // setInterval(gameloop, 10)