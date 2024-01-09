const questions = [
  {
    question: "Quel joueur est sur l'image?",
    options: ["Joueur A", "Joueur B", "Joueur C", "Joueur D"],
    correctAnswers: ["a", "b"],
    imageUrl:
      "https://jetpunk.b-cdn.net/img/user-photo-library/a5/a5f4c25fe8-235.jpg",
  },
  {
    question: "Quel joueur est sur l'image?",
    options: ["Joueur E", "Joueur F", "Joueur G", "Joueur H"],
    correctAnswers: ["b", "c"],
    imageUrl:
      "https://jetpunk.b-cdn.net/img/user-photo-library/f9/f95a1f47db-235.jpg",
  },
];

const currentQuestionIndex = 0;

function loadQuestion() {
  const questionElement = document.getElementById("question");
  const optionsElement = document.getElementById("options");
  const resultText = document.getElementById("result");
  const carouselInner = document.querySelector(".carousel-inner");

  carouselInner.innerHTML = "";

  questions.forEach(function (question, index) {
    const carouselItem = document.createElement("div");
    carouselItem.className =
      index === 0 ? "carousel-item active" : "carousel-item";
    const playerImage = document.createElement("img");
    playerImage.src = question.imageUrl;
    playerImage.alt = question.options[0];
    playerImage.className = "d-block mx-auto";
    carouselItem.appendChild(playerImage);

    const optionsDiv = document.createElement("div");
    optionsDiv.className = "options mt-4";
    carouselItem.appendChild(optionsDiv);

    carouselInner.appendChild(carouselItem);
  });

  const currentQuestion = questions[currentQuestionIndex];

  questionElement.textContent =
    "Question " + (currentQuestionIndex + 1) + ": " + currentQuestion.question;

  optionsElement.innerHTML = "";
  currentQuestion.options.forEach(function (option, index) {
    const optionLabel = document.createElement("label");
    optionLabel.innerHTML =
      '<input type="checkbox" name="answer" value="' +
      String.fromCharCode(97 + index) +
      '"> ' +
      option;
    optionsElement.appendChild(optionLabel);
  });

  resultText.textContent = "";

  document.getElementById("submit-btn").disabled = false;
}

function checkAnswer() {
  const userAnswers = document.querySelectorAll('input[name="answer"]:checked');
  const resultText = document.getElementById("result");

  if (userAnswers.length > 0) {
    const selectedAnswers = Array.from(userAnswers).map(function (checkbox) {
      return checkbox.value;
    });

    const currentQuestion = questions[currentQuestionIndex];
    const correctAnswers = currentQuestion.correctAnswers;

    const isCorrect = correctAnswers.every(function (answer) {
      return selectedAnswers.includes(answer);
    });

    if (isCorrect) {
      resultText.textContent = "Bonne réponse!";
      resultText.classList.remove("incorrect");
      resultText.classList.add("correct");
    } else {
      resultText.textContent =
        "Mauvaise réponse. Les bonnes réponses sont " +
        correctAnswers
          .map(function (answer) {
            return currentQuestion.options[answer.charCodeAt(0) - 97];
          })
          .join(", ") +
        ".";
      resultText.classList.remove("correct");
      resultText.classList.add("incorrect");
    }

    document.getElementById("submit-btn").disabled = true;

    setTimeout(function () {
      currentQuestionIndex++;
      if (currentQuestionIndex < questions.length) {
        loadQuestion();
      } else {
        resultText.textContent = "Quiz terminé!";
      }
    }, 1500);
  } else {
    resultText.textContent = "Veuillez sélectionner au moins une réponse.";
    resultText.classList.remove("correct", "incorrect");
  }
}

window.onload = loadQuestion;
