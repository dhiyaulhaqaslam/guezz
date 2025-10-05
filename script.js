const levels = [
   {
      title: "Level 1 - 2000s (Modern Rock Revival)",
      theme: "linear-gradient(135deg, #2e3192, #1bffff)", // soft blue
      icon: "🎧",
      bands: [
         {
            clue: "British band known for 'Yellow' and 'Viva La Vida'.",
            answer: "Coldplay",
         },
         {
            clue: "American band famous for 'In the End' and 'Numb'.",
            answer: "Linkin Park",
         },
         {
            clue: "Pop-punk legends known for 'All the Small Things'.",
            answer: "Blink-182",
         },
      ],
   },
   {
      title: "Level 2 - 1990s (Grunge & Britpop Era)",
      theme: "linear-gradient(135deg, #141e30, #243b55)", // darker navy
      icon: "🎸",
      bands: [
         {
            clue: "Seattle band with hit 'Smells Like Teen Spirit'.",
            answer: "Nirvana",
         },
         {
            clue: "British band with 'Wonderwall' and 'Don't Look Back in Anger'.",
            answer: "Oasis",
         },
         {
            clue: "American alternative band known for '1979'.",
            answer: "The Smashing Pumpkins",
         },
      ],
   },
   {
      title: "Level 3 - 1980s (Synth & Arena Rock)",
      theme: "linear-gradient(135deg, #ff9966, #ff5e62)", // warm orange-pink
      icon: "🎹",
      bands: [
         {
            clue: "Irish rock band led by Bono, famous for 'With or Without You'.",
            answer: "U2",
         },
         {
            clue: "British band with hit 'Hungry Like the Wolf'.",
            answer: "Duran Duran",
         },
         {
            clue: "Band known for 'Sweet Child O’ Mine'.",
            answer: "Guns N’ Roses",
         },
      ],
   },
   {
      title: "Level 4 - 1970s (Classic Rock)",
      theme: "linear-gradient(135deg, #f7971e, #ffd200)", // vintage yellow-gold
      icon: "🎤",
      bands: [
         {
            clue: "British band whose guitarist is Jimmy Page.",
            answer: "Led Zeppelin",
         },
         { clue: "Rock band known for 'Bohemian Rhapsody'.", answer: "Queen" },
         {
            clue: "Australian band famous for 'Highway to Hell'.",
            answer: "AC/DC",
         },
      ],
   },
   {
      title: "Level 5 - 1960s (The Legends)",
      theme: "linear-gradient(135deg, #8e2de2, #4a00e0)", // royal purple
      icon: "🎷",
      bands: [
         {
            clue: "British group known for 'Hey Jude' and 'Let It Be'.",
            answer: "The Beatles",
         },
         {
            clue: "American band known for 'Light My Fire'.",
            answer: "The Doors",
         },
         {
            clue: "Rock pioneers known for 'Satisfaction'.",
            answer: "The Rolling Stones",
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
      alert("Masukkan nama dulu ya!");
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
      timerEl.textContent = `⏱️ ${timer}s`;
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
   document.body.style.background = currentLevel.theme;
   levelTitleEl.textContent = `${currentLevel.icon} ${currentLevel.title}`;
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
      alert(`Level selesai! Sekarang masuk ke ${levels[levelIndex].title}`);
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
      resultEl.textContent = `❌ Wrong Answer!: ${levels[levelIndex].bands[currentIndex].answer}`;
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
   clueEl.textContent = `🎉 Permainan selesai! Skor akhir: ${score}`;
   answerEl.disabled = true;
   submitBtn.disabled = true;
   nextBtn.textContent = "Restart";

   saveLeaderboard({ name: playerName, score, time: timer });
   alert("Game Over! Waktu dan skor kamu sudah disimpan di leaderboard.");
   showLeaderboard();
}

// Leaderboard
function saveLeaderboard(entry) {
   const data = JSON.parse(localStorage.getItem("leaderboard")) || [];
   data.push(entry);
   data.sort((a, b) => b.score - a.score || a.time - b.time);
   localStorage.setItem("leaderboard", JSON.stringify(data.slice(0, 10)));
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
