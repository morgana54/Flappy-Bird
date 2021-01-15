const obstacle = document.getElementById("obstacle");
const hole = document.getElementById("hole")

hole.addEventListener('animationiteration', () => {
    let random = -((Math.random()*370) + 130);
    hole.style.top = `${random}px`;
})

