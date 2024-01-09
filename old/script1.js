document.addEventListener("DOMContentLoaded", function () {
  const playersContainer = document.getElementById("players-container");
  const timerDisplay = document.getElementById("timer");
  const playerNameInput = document.getElementById("player-name-input");
  const startButton = document.getElementById("start-button");

  let timerSeconds = 600; // 10 minutes
  let timerInterval;
  let correctAnswers = 0;

  function updateTimerDisplay() {
    const minutes = Math.floor(timerSeconds / 60);
    const seconds = timerSeconds % 60;
    timerDisplay.textContent = `${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;
  }

  function startTimer() {
    timerInterval = setInterval(function () {
      if (timerSeconds > 0) {
        timerSeconds--;
        updateTimerDisplay();
      } else {
        clearInterval(timerInterval);
        displayResult();
      }
    }, 1000);
  }

  function stopTimer() {
    clearInterval(timerInterval);
  }

  function displayResult() {
    const percentage = (correctAnswers / 100) * 100;
    const resultContainer = document.createElement("div");

    const resultText = document.createElement("p");
    resultText.textContent = `Résultat : ${correctAnswers} sur 100 (${percentage}%)`;

    resultContainer.appendChild(resultText);
    playersContainer.appendChild(resultContainer);

    if (percentage > 50) {
      resultText.style.color = "green";
    } else {
      resultText.style.color = "red";
    }
  }

  function createPlayerCard(playerIndex) {
    const playerCard = document.createElement("div");
    playerCard.classList.add("player-card");

    const playerImage = document.createElement("img");
    playerImage.src = `lien_image_${playerIndex}.jpg`; // Remplacez par le lien réel de l'image du joueur
    playerImage.alt = `Joueur ${playerIndex + 1}`;
    playerImage.classList.add("player-image");

    const playerNameInput = document.createElement("input");
    playerNameInput.type = "text";
    playerNameInput.placeholder = "Entrez le nom du joueur";
    playerNameInput.classList.add("player-input");

    playerCard.appendChild(playerImage);
    playerCard.appendChild(playerNameInput);

    playersContainer.appendChild(playerCard);
  }


  startButton.addEventListener("click", startTimer);

  // Ajouter une fonction pour vérifier la réponse à chaque entrée de l'utilisateur
  playerNameInput.addEventListener("input", function () {
    const playerName = playerNameInput.value.toLowerCase();
    // Remplacez cela par la vérification réelle de la réponse du joueur
    const correctPlayerName = "nom_du_joueur"; // Remplacez par le nom réel du joueur
    if (playerName === correctPlayerName.toLowerCase()) {
      correctAnswers++;
    }
  });
});
