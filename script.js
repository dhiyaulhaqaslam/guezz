const levels = [
   {
      title: "Level 1 - Easy (90s)",
      bands: [
         {
            clue: "This grunge band from Seattle took the world by storm with their hit 'Smells Like Teen Spirit'.",
            answer: "Nirvana",
         },
         {
            clue: "This American rock band's frontman is known for his unique voice and hits like 'November Rain' and 'Sweet Child O' Mine'.",
            answer: "Guns N' Roses",
         },
         {
            clue: "This British band's hit 'Wonderwall' became an anthem of the 90s, thanks to their unique sound and emotional lyrics.",
            answer: "Oasis",
         },
      ],
   },
   {
      title: "Level 2 - Medium (80s)",
      bands: [
         {
            clue: "Fronted by Freddie Mercury, this British rock band is known for their operatic rock hit 'Bohemian Rhapsody'.",
            answer: "Queen",
         },
         {
            clue: "Fronted by Bono, this Irish rock band is famous for their politically charged songs like 'With or Without You' and 'Beautiful Day'.",
            answer: "U2",
         },
         {
            clue: "This American band's frontman is known for his unique style and hits like 'Purple Rain' and 'When Doves Cry'.",
            answer: "Prince & The Revolution",
         },
      ],
   },
   {
      title: "Level 3 - Hard (60s-70s)",
      bands: [
         {
            clue: "Fronted by Mick Jagger and Keith Richards, this British band is known for their hit 'Paint It Black' and their influence on the Rolling Stones sound.",
            answer: "The Rolling Stones",
         },
         {
            clue: "This American band is known for their hit 'Wonderwall' and their role in the Britpop movement of the 90s.",
            answer: "Oasis",
         },
         {
            clue: "This British band is known for their hit 'Smells Like Teen Spirit' and their impact on the grunge movement of the 90s.",
            answer: "Nirvana",
         },
      ],
   },
];

let levelIndex = 0;
let currentIndex = 0;
let score = 0;

const clueEl = document.getElementById("clue");
const answerEl = document.getElementById("answer");
const submitBtn = document.getElementById("submit-btn");
const nextBtn = document.getElementById("next-btn");
const resultEl = document.getElementById("result");
const scoreEl = document.getElementById("score");
const levelTitleEl = document.getElementById("level-title");

nextBtn.addEventListener("click", nextQuestion);
submitBtn.addEventListener("click", checkAnswer);

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
         clueEl.textContent = `🎉 Game Over! Final Score: ${score}`;
         answerEl.disabled = true;
         submitBtn.disabled = true;
         nextBtn.textContent = "Restart";
         levelIndex = 0;
         score = 0;
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

startLevel();
