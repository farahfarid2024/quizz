// Données du quiz
const quizData = [
  {
    image:
      "https://jetpunk.b-cdn.net/img/user-photo-library/a5/a5f4c25fe8-235.jpg",
    question: "Qui est ce joueur ?",
    options: ["A", "B", "C", "D"],
    correctOption: "A",
  },
  {
    image:
      "https://jetpunk.b-cdn.net/img/user-photo-library/f9/f95a1f47db-235.jpg",
    question: "Qui est ce joueur ?",
    options: ["X", "Y", "Z", "W"],
    correctOption: "X",
  },
  {
    image:
      "https://jetpunk.b-cdn.net/img/user-photo-library/2e/2ea55e0045-235.jpg",
    question: "Qui est ce joueur ?",
    options: ["Q", "R", "S", "T"],
    correctOption: "Q",
  },
  {
    image:
      "https://jetpunk.b-cdn.net/img/user-photo-library/2e/2ea55e0045-235.jpg",
    question: "Qui est ce joueur ?",
    options: ["Q", "R", "S", "T"],
    correctOption: "Q",
  },
  {
    image:
      "https://jetpunk.b-cdn.net/img/user-photo-library/2e/2ea55e0045-235.jpg",
    question: "Qui est ce joueur ?",
    options: ["Q", "R", "S", "T"],
    correctOption: "Q",
  },
];

// Éléments HTML pour interagir avec l'interface utilisateur
const startContainer = document.getElementById("start-container");
const startButton = document.getElementById("start-button");
const quizContainer = document.getElementById("quiz-container");
const questionElement = document.getElementById("question");
const resultElement = document.getElementById("result");
const scoreElement = document.getElementById("score");
const imageElement = document.getElementById("quiz-image");
const progressBar = document.getElementById("progress-bar");
const timerElement = document.getElementById("timer");
const resultsContainer = document.getElementById("results-container");
const finalScoreValue = document.getElementById("final-score-value");

// Ajoutez un écouteur d'événements au clic sur le bouton de démarrage
startButton.addEventListener("click", startQuiz);

// Ajoutez cette fonction pour démarrer le quizz
function startQuiz() {
  // Masquer le conteneur de démarrage et affichez le conteneur de quiz
  startContainer.classList.add("hidden");
  quizContainer.classList.remove("hidden");

  // Initialiser le minuteur lorsque le script est chargé
  initializeTimer();

  // Charger la première question
  loadQuestion();

  // Faire défiler la page jusqu'à la section du quiz
  quizContainer.scrollIntoView({ behavior: "smooth" });
}

// Variables pour suivre la question actuelle et le score
let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 20;

// Fonction pour initialiser le minuteur
function initializeTimer() {
  updateTimer(); // Démarrer le minuteur
}

// Fonction pour mettre à jour le minuteur
function updateTimer() {
  let plural = "";
  if (timeLeft > 1) {
    plural = "s";
  }
  timerElement.textContent = `Temps restant : ${timeLeft} seconde${plural}`;
  // Vérifier si le temps est écoulé
  if (timeLeft === 0) {
    checkAnswer();
  } else {
    timeLeft--;
    const pourcentageProgression = ((20 - timeLeft) / 20) * 100;
    progressBar.style.width = `${pourcentageProgression}%`;

    // Mettre à jour toutes les secondes, sauf si c'est la dernière question
    if (currentQuestionIndex < quizData.length - 1) {
      if (currentTimer) {
        clearTimeout(currentTimer);
      }
      currentTimer = setTimeout(updateTimer, 1000);
    }
  }
}

// Nouvelle fonction pour gérer le clic sur une option
function handleOptionClick(selectedOption) {
  // Désactiver les clics sur les options après avoir fait un choix
  const options = document.querySelectorAll(".option");
  options.forEach((option) =>
    option.removeEventListener("click", handleOptionClick)
  );
  // for (const option of options) {
  //       option.removeEventListener("click", handleOptionClick)

  // }

  // Appeler la fonction pour vérifier la réponse et attribuer des points
  checkAnswer(selectedOption);

  // Vérifier s'il y a plus de questions ou terminer le quiz
  if (currentQuestionIndex < quizData.length - 1) {
    // Charger la réponse après 1sec
    setTimeout(() => {
      showAnswer();
      // Passer à la question suivante après un autre court délai de 1s
      setTimeout(() => {
        currentQuestionIndex++;
        loadQuestion();
        timeLeft = 20; // Réinitialiser le temps pour chaque nouvelle question
        updateTimer(); // Redémarrer le minuteur pour la nouvelle question
      }, 1000);
    }, 1000);
  } else {
    // Dernière question
    setTimeout(() => {
      handleLastQuestion();
    }, 1000);
  }
}

// Fonction pour afficher la réponse
function showAnswer() {
  const currentQuestion = quizData[currentQuestionIndex];
  setResultMessage(`Réponse : Joueur ${currentQuestion.correctOption}`);
}

// Fonction pour charger une nouvelle question
function loadQuestion() {
  const currentQuestion = quizData[currentQuestionIndex];

  // Mettre à jour l'image, le texte alternatif et le texte de la question
  imageElement.src = currentQuestion.image;
  imageElement.alt = `Joueur ${currentQuestionIndex + 1}`;
  questionElement.textContent = currentQuestion.question;

  const optionsContainer = document.getElementById("options");
  optionsContainer.innerHTML = "";

  // Créer des éléments HTML pour chaque option et ajouter des clics
  currentQuestion.options.forEach((option) => {
    const optionElement = document.createElement("div");
    optionElement.className = "option";
    optionElement.textContent = `Joueur ${option}`;

    // Événement pour vérifier la réponse lorsqu'une option est cliquée
    optionElement.addEventListener("click", () => handleOptionClick(option));
    optionsContainer.appendChild(optionElement);
  });
}

// Fonction pour vérifier la réponse sélectionnée par rapport à la réponse correcte
function checkAnswer(selectedOption) {
  const currentQuestion = quizData[currentQuestionIndex];

  // Vérifier si l'option sélectionnée est correcte
  if (selectedOption === currentQuestion.correctOption) {
    // Incrémenter le score et afficher un message de succès
    score++;
    setResultMessage("Bravo!");
  } else {
    // Afficher un message d'échec
    setResultMessage("T'as fait du sale");
  }

  // Mettre à jour le score
  scoreElement.textContent = `Score : ${score}`;
}

// Fonction pour définir et effacer les messages de résultat
function setResultMessage(message) {
  resultElement.textContent = message;

  // Effacer le message de résultat après 1 seconde
  setTimeout(() => {
    resultElement.textContent = "";
  }, 1000);
}

// Fonction pour terminer le quiz et afficher les résultats
function endQuiz() {
  // Masquer le conteneur du quiz, afficher le conteneur des résultats
  quizContainer.classList.add("hidden");
  resultsContainer.classList.remove("hidden");

  // Afficher le score final et un message de conclusion
  finalScoreValue.textContent = score;
  displayConclusionMessage();
}

// Nouvelle fonction pour afficher un message de conclusion
function displayConclusionMessage() {
  // le message en fonction du score
  let conclusionMessage = "";
  if (score === quizData.length) {
    conclusionMessage =
      "Félicitations! Vous avez répondu correctement à toutes les questions!";
  } else if (score >= quizData.length / 2) {
    conclusionMessage = "Bien joué! Vous avez passé le quiz!";
  } else {
    conclusionMessage =
      "Vous pouvez faire mieux. Revenez et essayez à nouveau!";
  }

  // Affichez le message de conclusion
  resultElement.textContent = conclusionMessage;
}

//   // Construisez l'URL avec le score en tant que paramètre
//   let redirectURL = "../resultat/resultat.html?score=" + score_toto;

//   // Effectuez la redirection vers la nouvelle URL
//   window.location.href = redirectURL;
// });

// DONE
// Fonction pour terminer le quiz et afficher les résultats
// Etape 1: on remplit la première question

// Etape 2: Quand on clique sur une des réponse
// 2 - A/ Vérifier si c'est la bonne réponse. Si oui score + 1 et on écrit bravo, sinon score change pas et on écrit "t'as fait du sale'"
// 2 - B/ Mettre la question d'après
// 3 - Bonus: Minuteur
// 3 - Avant la question 0, mettre un bouton commencer le quizz + une explication des règles au dessus
//   - Quand c'est 1 ou 0 secondes pas de "s"

// TODO
// Partir de la liste des joueurs pour construire les questions
// 2 - C/ Si ya plus de question, mettre une page résultat (enlever bouton redirection)
// 2 - D/ Barre de progression (Question 0/5)
// 3 - Style: lisible, vérifier responsive, meilleur style pour le score (cacher le score)
// 3 - Page résultats: mettre un style différent en fonction du score (?score=22&nb_questions=100)
//

// 4 - Bonus ++ Sauvegarder le score dans le local storage
