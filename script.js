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

const clueEl = document.getElementById("clue");
const answerEl = document.getElementById("answer");
const submitBtn = document.getElementById("submit-btn");
const nextBtn = document.getElementById("next-btn");
const resultEl = document.getElementById("result");
const scoreEl = document.getElementById("score");
const levelTitleEl = document.getElementById("level-title");

nextBtn.addEventListener("click", nextQuestion);
submitBtn.addEventListener("click", checkAnswer);

// 🔹 NEW FEATURE: tekan Enter untuk submit jawaban
answerEl.addEventListener("keydown", (e) => {
   if (e.key === "Enter" && !submitBtn.disabled) {
      e.preventDefault();
      checkAnswer();
   }
});

function startLevel() {
   const currentLevel = levels[levelIndex];
   levelTitleEl.textContent = currentLevel.title;
   currentIndex = 0;
   nextQuestion();
}

function nextQuestion() {
   const currentLevel = levels[levelIndex];

   // Jika tombol restart ditekan
   if (nextBtn.textContent === "Restart") {
      nextBtn.textContent = "Next";
      levelIndex = 0;
      score = 0;
      scoreEl.textContent = "Score: 0";
      startLevel();
      return;
   }

   // Cek apakah semua pertanyaan di level selesai
   if (currentIndex >= currentLevel.bands.length) {
      levelIndex++;
      if (levelIndex >= levels.length) {
         clueEl.textContent = `🎉 Game Over! Final Score: ${score}`;
         answerEl.disabled = true;
         submitBtn.disabled = true;
         nextBtn.textContent = "Restart";
         return;
      }
      alert(`✅ Level Complete! Moving to ${levels[levelIndex].title}`);
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
