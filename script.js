const quizData = [
  {
    question: "1. What is the capital of France?",
    type: "single",
    options: ["Berlin", "Madrid", "Paris", "Lisbon"],
    answer: "Paris"
  },
  {
    question: "2. Select all prime numbers:",
    type: "multi",
    options: ["2", "4", "5", "6"],
    answer: ["2", "5"]
  },
  {
    question: "3. Fill in the blank: The Sun rises in the _____",
    type: "text",
    answer: "east"
  },
  {
    question: "4. Which of the following are programming languages?",
    type: "multi",
    options: ["HTML", "Python", "Java", "Photoshop"],
    answer: ["Python", "Java"]
  },
  {
    question: "5. What is 5 + 7?",
    type: "single",
    options: ["10", "12", "14", "15"],
    answer: "12"
  }
];

function loadQuiz() {
  const container = document.getElementById('quiz-container');
  container.innerHTML = '';

  quizData.forEach((q, index) => {
    const div = document.createElement('div');
    div.classList.add('question');
    div.innerHTML = `<p>${q.question}</p>`;

    if (q.type === 'single') {
      q.options.forEach(opt => {
        div.innerHTML += `
          <label>
            <input type="radio" name="q${index}" value="${opt}"> ${opt}
          </label><br/>
        `;
      });
    } else if (q.type === 'multi') {
      q.options.forEach(opt => {
        div.innerHTML += `
          <label>
            <input type="checkbox" name="q${index}" value="${opt}"> ${opt}
          </label><br/>
        `;
      });
    } else if (q.type === 'text') {
      div.innerHTML += `<input type="text" name="q${index}" />`;
    }

    container.appendChild(div);
  });
}

function submitQuiz() {
  let score = 0;

  quizData.forEach((q, index) => {
    const inputs = document.getElementsByName(`q${index}`);

    if (q.type === 'single') {
      inputs.forEach(i => {
        if (i.checked && i.value === q.answer) score++;
      });
    } else if (q.type === 'multi') {
      const selected = Array.from(inputs).filter(i => i.checked).map(i => i.value);
      if (JSON.stringify(selected.sort()) === JSON.stringify(q.answer.sort())) {
        score++;
      }
    } else if (q.type === 'text') {
      const input = inputs[0].value.trim().toLowerCase();
      if (input === q.answer.toLowerCase()) score++;
    }
  });

  document.getElementById('result').innerHTML = `<h3>Your score: ${score}/${quizData.length}</h3>`;
}

loadQuiz();
