const bands = [
   {
      clue: "A British rock band famous for 'Fix You' and 'Viva La Vida'.",
      answer: "Coldplay",
   },
   {
      clue: "American pop-rock band known for 'Sugar' and 'Moves Like Jagger'.",
      answer: "Maroon 5",
   },
   { clue: "Rock band whose lead singer is Freddie Mercury.", answer: "Queen" },
   { clue: "K-pop group famous for 'Dynamite' and 'Butter'.", answer: "BTS" },
   { clue: "Alternative rock band known for 'Creep'.", answer: "Radiohead" },
];

let currentIndex = 0;
let score = 0;

const clueEl = document.getElementById("clue");
const answerEl = document.getElementById("answer");
const submitBtn = document.getElementById("submit-btn");
const nextBtn = document.getElementById("next-btn");
const resultEl = document.getElementById("result");
const scoreEl = document.getElementById("score");

nextBtn.addEventListener("click", nextQuestion);
submitBtn.addEventListener("click", checkAnswer);

function nextQuestion() {
   if (currentIndex >= bands.length) {
      clueEl.textContent = "🎉 Game Over! Final Score: " + score;
      answerEl.disabled = true;
      submitBtn.disabled = true;
      nextBtn.textContent = "Restart";
      currentIndex = 0;
      score = 0;
      return;
   }

   const currentBand = bands[currentIndex];
   clueEl.textContent = currentBand.clue;
   answerEl.disabled = false;
   submitBtn.disabled = false;
   resultEl.textContent = "";
   answerEl.value = "";
   nextBtn.disabled = true;
}

function checkAnswer() {
   const userAnswer = answerEl.value.trim().toLowerCase();
   const correctAnswer = bands[currentIndex].answer.toLowerCase();

   if (userAnswer === correctAnswer) {
      resultEl.textContent = "✅ Correct!";
      score++;
   } else {
      resultEl.textContent =
         "❌ Wrong! The correct answer was: " + bands[currentIndex].answer;
   }

   scoreEl.textContent = "Score: " + score;
   currentIndex++;
   nextBtn.textContent = currentIndex >= bands.length ? "Finish" : "Next";
   nextBtn.disabled = false;
   answerEl.disabled = true;
   submitBtn.disabled = true;
}
