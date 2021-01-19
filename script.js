const obstacle = document.getElementById("obstacle");
const hole = document.getElementById("hole")
const platypus = document.getElementById("platypus")
let jumping = 0; // Used in jump function
let score = 0;
let fallCount = 0;

// Generate random hole
hole.addEventListener('animationiteration', () => {
    console.log('hha')
    let random = -((Math.random()*370) + 130);
    hole.style.top = `${random}px`;
    score++; // add to score for beating the hole
    updateScore()
})

// Make platypus jump
window.addEventListener("keyup", jump)

// Gravity
setInterval(() => { 
    let platypusTop = 
    parseInt(window.getComputedStyle(platypus).getPropertyValue("top"));

    // Acceleration 
    if(fallCount > 50) {
        platypusTop += 5;
    } else if(fallCount > 25) {
        platypusTop += 4;
    } else {
        platypusTop += 3; 
    }

    if(jumping == 0) {
        platypus.style.top = `${platypusTop}px` 
    }

    if ((platypusTop > 475) || (intersects(platypus, obstacle) && !containsInHeight(platypus, hole))) {
        alert("Game over! Score: " + score)
        platypus.style.top = 100 + "px";
        score = 0;
        fallCount = 0;
    }

    fallCount++;
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
        if(jumpCount > 14) {
            platypus.style.top = `${platypusTop-2}px`
        }
        if(jumpCount > 26) {
            clearInterval(jumpInterval);
            jumping = 0;
            jumpCount = 0;
        }
        jumpCount++;
        fallCount = 0;
    }, 10)
} 

function updateScore() {
    let scoreBox = document.getElementById("score")
    scoreBox.innerHTML = `Score: ${score}`
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

    console.log(`topA: ${topA} , topB: ${topB}, hA: ${heightA}, hB: ${heightB}`)

    return ((topA > topB) && (topA + heightA < topB + heightB)) ? true : false
}

// // sleep time expects milliseconds
// function sleep (time) {
//     return new Promise((resolve) => setTimeout(resolve, time));
// }

/* DODAWAĆ TEŻ JAKIEŚ FAJNE ANIMACJE I LEPSZE STYLE DO TEJ GRY ŻEBY BYŁA ŻYWA!!!!!!!!!!!!!!!!!!!!!!! transition properties 
- napsz kod estetyczniej troszkę! 
- do heading dasz coś fajnego ze zmianą kształtu, koloru, cienia i wielkości!!!
- dodać instrukcję grania krótką
- ogarnąć lepszy restart gry, żeby animacja filarów zaczynała się zawsze od początku
- custom alert
- dodać animację fajną jak będzie skok czy coś, jakiś zwykły rotate wystarczy
- dodać animację umierającego dziobaka
- poziom trudności:
    - zmniejszać dziury lekko co jakiś score
    - przyspieszać lekko animację co jakiś score!!
- zrobić tak żeby zawsze dziobak umierał jeśli się dokładnie styka z obstacle (miałeś pomysł na sleep function, ale moze np. wgle nie bedzie potrzebne po zrobieniu animacji itp.)
*/