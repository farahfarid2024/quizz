const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});
let score = params.score;
console.log("score", score);
// Obtenez l'élément container dans le DOM
var containerElement = document.querySelector('.container');

// Appliquez des styles différents en fonction du score
if (score >= 80) {
  containerElement.style.backgroundColor = 'green';
  // Ajoutez d'autres styles pour un score élevé
} else if (score >= 50) {
  containerElement.style.backgroundColor = 'yellow';
  // Ajoutez d'autres styles pour un score moyen
} else {
  containerElement.style.backgroundColor = 'red';
  // Ajoutez d'autres styles pour un score faible
}