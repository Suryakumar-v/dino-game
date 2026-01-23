const player = document.getElementById("player");
const obstacle = document.getElementById("obstacle");
const scoreEl = document.getElementById("score");

let score = 0;
let speed = 1.5;
let gameOver = false;

// Jump
function jump() {
  if (!player.classList.contains("jump") && !gameOver) {
    player.classList.add("jump");
    setTimeout(() => player.classList.remove("jump"), 500);
  }
}

document.addEventListener("keydown", e => {
  if (e.code === "Space") jump();
});
document.addEventListener("click", jump);

// Score counter
const scoreInterval = setInterval(() => {
  if (!gameOver) {
    score++;
    scoreEl.textContent = score;

    // Increase difficulty
    if (score % 100 === 0 && speed > 0.8) {
      speed -= 0.1;
      obstacle.style.animationDuration = speed + "s";
    }
  }
}, 100);

// Collision detection
const collisionCheck = setInterval(() => {
  const playerBottom = parseInt(getComputedStyle(player).bottom);
  const obstacleRight = parseInt(getComputedStyle(obstacle).right);

  if (
    obstacleRight > 520 &&
    obstacleRight < 570 &&
    playerBottom < 40
  ) {
    gameOver = true;
    obstacle.style.animationPlayState = "paused";
    alert("Game Over! Score: " + score);
    location.reload();
  }
}, 10);

