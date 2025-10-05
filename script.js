const levels = [
   {
      title: "Level 1 - Easy (1990s)",
      bands: [
         {
            clue: "This Seattle grunge band changed rock forever with their 1991 hit 'Smells Like Teen Spirit'.",
            answer: "Nirvana",
         },
         {
            clue: "This British band led by Liam and Noel Gallagher became Britpop icons with 'Wonderwall'.",
            answer: "Oasis",
         },
         {
            clue: "This American rock band fronted by Billy Corgan released the hit '1979'.",
            answer: "The Smashing Pumpkins",
         },
      ],
   },
   {
      title: "Level 2 - Medium (1980s)",
      bands: [
         {
            clue: "This Irish band, fronted by Bono, is known for 'With or Without You'.",
            answer: "U2",
         },
         {
            clue: "This British new wave band had a hit with 'Hungry Like the Wolf'.",
            answer: "Duran Duran",
         },
         {
            clue: "This American band, led by Axl Rose, rocked the world with 'Sweet Child O' Mine'.",
            answer: "Guns N' Roses",
         },
      ],
   },
   {
      title: "Level 3 - Hard (2000s)",
      bands: [
         {
            clue: "This American rock band fronted by Chris Martin gained worldwide fame with 'Yellow'.",
            answer: "Coldplay",
         },
         {
            clue: "This pop-punk band from California made hits like 'All the Small Things'.",
            answer: "Blink-182",
         },
         {
            clue: "This American band won multiple Grammys for their debut album 'Hybrid Theory'.",
            answer: "Linkin Park",
         },
      ],
   },
];

let levelIndex = 0;
let currentIndex = 0;
let score = 0;
let timer = 0;
let timerInterval;
let playerName = "";

// Elements
const lobby = document.getElementById("lobby");
const gameBox = document.getElementById("game-box");
const leaderboard = document.getElementById("leaderboard");
const leaderboardList = document.getElementById("leaderboard-list");

const startBtn = document.getElementById("start-btn");
const showLeaderboardBtn = document.getElementById("show-leaderboard");
const backBtn = document.getElementById("back-btn");

const clueEl = document.getElementById("clue");
const answerEl = document.getElementById("answer");
const submitBtn = document.getElementById("submit-btn");
const nextBtn = document.getElementById("next-btn");
const resultEl = document.getElementById("result");
const scoreEl = document.getElementById("score");
const levelTitleEl = document.getElementById("level-title");
const timerEl = document.getElementById("timer");

// Lobby Events
startBtn.addEventListener("click", () => {
   const nameInput = document.getElementById("player-name").value.trim();
   if (!nameInput) {
      alert("Please enter your name first!");
      return;
   }
   playerName = nameInput;
   showGame();
});

showLeaderboardBtn.addEventListener("click", showLeaderboard);
backBtn.addEventListener("click", showLobby);

// Game Events
nextBtn.addEventListener("click", nextQuestion);
submitBtn.addEventListener("click", checkAnswer);
answerEl.addEventListener("keydown", (e) => {
   if (
      e.key === "Enter" &&
      !submitBtn.disabled &&
      answerEl.value.trim() !== ""
   ) {
      e.preventDefault();
      checkAnswer();
   }
});

// Timer
function startTimer() {
   timer = 0;
   clearInterval(timerInterval);
   timerInterval = setInterval(() => {
      timer++;
      timerEl.textContent = `Time: ${timer}s`;
   }, 1000);
}

function stopTimer() {
   clearInterval(timerInterval);
}

// Navigation
function showLobby() {
   leaderboard.style.display = "none";
   gameBox.style.display = "none";
   lobby.style.display = "block";
}

function showGame() {
   lobby.style.display = "none";
   leaderboard.style.display = "none";
   gameBox.style.display = "block";
   resetGame();
}

function showLeaderboard() {
   lobby.style.display = "none";
   gameBox.style.display = "none";
   leaderboard.style.display = "block";
   renderLeaderboard();
}

// Game logic
function resetGame() {
   levelIndex = 0;
   currentIndex = 0;
   score = 0;
   scoreEl.textContent = "Score: 0";
   startLevel();
   startTimer();
}

function startLevel() {
   const currentLevel = levels[levelIndex];
   levelTitleEl.textContent = currentLevel.title;
   currentIndex = 0;
   nextQuestion();
}

function nextQuestion() {
   const currentLevel = levels[levelIndex];

   if (currentIndex >= currentLevel.bands.length) {
      levelIndex++;
      if (levelIndex >= levels.length) {
         endGame();
         return;
      }
      alert(`Level Complete! Moving to ${levels[levelIndex].title}`);
      startLevel();
      return;
   }

   const currentBand = currentLevel.bands[currentIndex];
   clueEl.textContent = currentBand.clue;
   resultEl.textContent = "";
   answerEl.value = "";
   nextBtn.disabled = true;
   answerEl.disabled = false;
   submitBtn.disabled = false;
   answerEl.focus();
}

function checkAnswer() {
   const userAnswer = answerEl.value.trim().toLowerCase();
   const correctAnswer =
      levels[levelIndex].bands[currentIndex].answer.toLowerCase();

   if (userAnswer === correctAnswer) {
      resultEl.textContent = "✅ Correct!";
      score++;
   } else {
      resultEl.textContent = `❌ Wrong! The correct answer was: ${levels[levelIndex].bands[currentIndex].answer}`;
   }

   scoreEl.textContent = "Score: " + score;
   currentIndex++;
   nextBtn.disabled = false;
   answerEl.disabled = true;
   submitBtn.disabled = true;
   nextBtn.textContent =
      currentIndex >= levels[levelIndex].bands.length ? "Next Level" : "Next";
}

function endGame() {
   stopTimer();
   clueEl.textContent = `🎉 Game Over! Final Score: ${score}`;
   answerEl.disabled = true;
   submitBtn.disabled = true;
   nextBtn.textContent = "Restart";

   saveLeaderboard({ name: playerName, score, time: timer });
   alert("Game Over! Your time has been saved to the leaderboard.");
   showLeaderboard();
}

// Leaderboard
function saveLeaderboard(entry) {
   const data = JSON.parse(localStorage.getItem("leaderboard")) || [];
   data.push(entry);
   data.sort((a, b) => b.score - a.score || a.time - b.time); // sort by score, then time
   localStorage.setItem("leaderboard", JSON.stringify(data.slice(0, 10))); // top 10
}

function renderLeaderboard() {
   const data = JSON.parse(localStorage.getItem("leaderboard")) || [];
   leaderboardList.innerHTML = "";
   data.forEach((entry, index) => {
      const li = document.createElement("li");
      li.textContent = `${index + 1}. ${entry.name} — ${entry.score} pts (${
         entry.time
      }s)`;
      leaderboardList.appendChild(li);
   });
}

// Start
showLobby();
