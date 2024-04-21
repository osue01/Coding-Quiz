const highscoreList = document.querySelector("#highscores");
let highscores = JSON.parse(localStorage.getItem("highscores")) || [];
console.log(highscores);

highscores.forEach(function (highscore, i) {
  let scoresList = document.createElement("li");
  scoresList.textContent = highscore.name + ". " + highscore.score;
  highscoreList.appendChild(scoresList);
});
