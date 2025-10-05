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
            clue: "This Irish band, fronted by Bono, is known for songs like 'With or Without You' and 'Sunday Bloody Sunday'.",
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
      title: "Level 3 - Hard (1970s)",
      bands: [
         {
            clue: "This British rock band is famous for 'Stairway to Heaven' and powerful guitar riffs by Jimmy Page.",
            answer: "Led Zeppelin",
         },
         {
            clue: "This Australian hard rock band is known for 'Back in Black' and 'Highway to Hell'.",
            answer: "AC/DC",
         },
         {
            clue: "This British progressive rock band is behind 'Comfortably Numb' and 'Another Brick in the Wall'.",
            answer: "Pink Floyd",
         },
      ],
   },
   {
      title: "Level 4 - Very Hard (Late 1960s - 1970s)",
      bands: [
         {
            clue: "This British band led by Freddie Mercury became legendary with 'Bohemian Rhapsody'.",
            answer: "Queen",
         },
         {
            clue: "Known for their hits 'Hotel California' and 'Take It Easy', this American band defined 70s soft rock.",
            answer: "Eagles",
         },
         {
            clue: "This British band, led by Roger Daltrey, became famous for 'Baba O'Riley' and smashing guitars on stage.",
            answer: "The Who",
         },
      ],
   },
   {
      title: "Level 5 - Expert (1960s)",
      bands: [
         {
            clue: "This British band, featuring John, Paul, George, and Ringo, revolutionized popular music with hits like 'Hey Jude'.",
            answer: "The Beatles",
         },
         {
            clue: "This British rock band, fronted by Mick Jagger, became known for 'Paint It Black' and 'Satisfaction'.",
            answer: "The Rolling Stones",
         },
         {
            clue: "This American band, led by Jim Morrison, became known for their dark lyrics and songs like 'Light My Fire'.",
            answer: "The Doors",
         },
      ],
   },
];

let levelIndex = 0;
let currentIndex = 0;
let score = 0;
let startTime;
let endTime;
let timerInterval;

const clueEl = document.getElementById("clue");
const answerEl = document.getElementById("answer");
const submitBtn = document.getElementById("submit-btn");
const nextBtn = document.getElementById("next-btn");
const resultEl = document.getElementById("result");
const scoreEl = document.getElementById("score");
const levelTitleEl = document.getElementById("level-title");
const timerEl = document.createElement("p");
timerEl.id = "timer";
document.getElementById("game-box").appendChild(timerEl);

const leaderboardEl = document.createElement("div");
leaderboardEl.id = "leaderboard";
document.body.appendChild(leaderboardEl);

nextBtn.addEventListener("click", nextQuestion);
submitBtn.addEventListener("click", checkAnswer);
answerEl.addEventListener("keydown", (e) => {
   if (e.key === "Enter") checkAnswer();
});

function startLevel() {
   const currentLevel = levels[levelIndex];
   levelTitleEl.textContent = currentLevel.title;
   currentIndex = 0;
   if (!startTime) startTimer(); // Start timer once
   nextQuestion();
}

function startTimer() {
   startTime = new Date();
   timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
   const now = new Date();
   const elapsed = Math.floor((now - startTime) / 1000);
   timerEl.textContent = `⏱️ Time: ${elapsed}s`;
}

function stopTimer() {
   clearInterval(timerInterval);
   endTime = new Date();
   const totalSeconds = Math.floor((endTime - startTime) / 1000);
   return totalSeconds;
}

function nextQuestion() {
   const currentLevel = levels[levelIndex];

   if (currentIndex >= currentLevel.bands.length) {
      levelIndex++;
      if (levelIndex >= levels.length) {
         const totalTime = stopTimer();
         const playerName = prompt("🎸 Enter your name for the leaderboard:");
         if (playerName) saveToLeaderboard(playerName, score, totalTime);

         clueEl.textContent = `🎉 Game Over! Final Score: ${score} | 🕒 Time: ${totalTime}s`;
         answerEl.disabled = true;
         submitBtn.disabled = true;
         nextBtn.textContent = "Restart";
         nextBtn.disabled = false;
         showLeaderboard();

         nextBtn.onclick = function () {
            levelIndex = 0;
            score = 0;
            startTime = null;
            timerEl.textContent = "⏱️ Time: 0s";
            scoreEl.textContent = "Score: 0";
            nextBtn.textContent = "Next";
            nextBtn.onclick = null;
            startLevel();
         };
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

// 🏆 Leaderboard functions
function saveToLeaderboard(name, score, time) {
   const data = JSON.parse(localStorage.getItem("guezzLeaderboard")) || [];
   data.push({ name, score, time });
   data.sort((a, b) => a.time - b.time); // Sort by fastest time
   if (data.length > 5) data.splice(5); // Keep top 5
   localStorage.setItem("guezzLeaderboard", JSON.stringify(data));
}

function showLeaderboard() {
   const data = JSON.parse(localStorage.getItem("guezzLeaderboard")) || [];
   leaderboardEl.innerHTML = `
      <h2>🏆 Leaderboard</h2>
      <table border="1" cellpadding="5" style="border-collapse: collapse; color:white;">
         <tr><th>Rank</th><th>Name</th><th>Score</th><th>Time (s)</th></tr>
         ${data
            .map(
               (p, i) =>
                  `<tr><td>${i + 1}</td><td>${p.name}</td><td>${p.score}</td><td>${p.time}</td></tr>`
            )
            .join("")}
      </table>
   `;
}

startLevel();
showLeaderboard();
