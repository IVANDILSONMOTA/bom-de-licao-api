
document.addEventListener("DOMContentLoaded", async () => {
  const questionEl = document.getElementById("question");
  const answersEl = document.getElementById("answers");
  const feedbackEl = document.getElementById("feedback");
  const nextBtn = document.getElementById("next-btn");

  let currentQuestion = null;

  async function fetchQuestion() {
    const res = await fetch("/quiz/random");
    const data = await res.json();
    currentQuestion = data;
    questionEl.textContent = data.question;
    answersEl.innerHTML = "";
    data.options.forEach((opt, idx) => {
      const btn = document.createElement("button");
      btn.textContent = opt;
      btn.onclick = () => checkAnswer(opt);
      answersEl.appendChild(btn);
    });
  }

  function checkAnswer(selected) {
    const correct = currentQuestion.answer;
    if (selected === correct) {
      feedbackEl.textContent = "✅ Acertou!";
      feedbackEl.style.color = "lightgreen";
    } else {
      feedbackEl.textContent = "❌ Errou! Resposta correta: " + correct;
      feedbackEl.style.color = "red";
    }
    nextBtn.style.display = "block";
  }

  nextBtn.onclick = () => {
    feedbackEl.textContent = "";
    nextBtn.style.display = "none";
    fetchQuestion();
  };

  fetchQuestion();
});
