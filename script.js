let score = 0;
let questionCount = 0;
let startTime = Date.now();
let timerInterval;


// Sélectionne les éléments audio
const correctSound = document.getElementById('correctSound');
const wrongSound = document.getElementById('wrongSound');
function reload() {
    location.reload(); // Recharge la page
  }
function generateQuestion() {
  const operators = ['+', '-', '*', '/'];
  let num1 = Math.floor(Math.random() * 9) + 1;
  let num2 = Math.floor(Math.random() * 9) + 1;
  let operator = operators[Math.floor(Math.random() * operators.length)];

  // Contrôle pour éviter les résultats négatifs ou décimaux
  if (operator === '-') {
    // Force num1 à être plus grand ou égal à num2
    if (num1 < num2) [num1, num2] = [num2, num1]; 
    document.getElementById('question').textContent = `${num1} - ${num2}`;
    return num1 - num2;
  } else if (operator === '/') {
    // Force num1 à être un multiple de num2 pour éviter les décimaux
    while (num1 % num2 !== 0) {
      num1 = Math.floor(Math.random() * 9) + 1;
      num2 = Math.floor(Math.random() * 9) + 1;
    }
    document.getElementById('question').textContent = `${num1} / ${num2}`;
    return num1 / num2;
  }

  // Pour les additions et multiplications
  document.getElementById('question').textContent = `${num1} ${operator} ${num2}`;
  return eval(`${num1} ${operator} ${num2}`);
}

let correctAnswer = generateQuestion();

function checkAnswer() {
  const userAnswer = Number(document.getElementById('answer').value);
  
  if (userAnswer === correctAnswer) {
    correctSound.pause();     // Arrête la lecture si elle est en cours
    correctSound.currentTime = 0; // Remet au début
    correctSound.play();      // Joue le son de bonne réponse
    score++;
  } else {
    wrongSound.pause();       // Arrête la lecture si elle est en cours
    wrongSound.currentTime = 0; // Remet au début
    wrongSound.play();        // Joue le son de mauvaise réponse
  }

  questionCount++;
  document.getElementById('answer').value = '';

  // Mise à jour du score en temps réel
  document.getElementById('realTimeScore').textContent = `Score actuel : ${score} / 20`;

  if (questionCount < 20) {
    correctAnswer = generateQuestion();
  } else {
    const endTime = Date.now();
    const totalTime = ((endTime - startTime) / 1000).toFixed(2);
    document.getElementById('score').textContent = `Score : ${score} / 20 - BRAVO`;
     document.getElementById('timer').style.display = 'block'
    document.getElementById('timer').innerHTML = `Temps écoulé : <span id="time">${totalTime}</span> secondes`;
    document.getElementById('game').style.display = 'none';

    // Crée le bouton pour recharger la page
    document.getElementById('reload').style.display = 'block';

    // Arrête le timer
    clearInterval(timerInterval);
  }
}

// Démarre le timer et stocke l'identifiant de l'intervalle
timerInterval = setInterval(() => {
  const elapsedTime = Math.floor((Date.now() - startTime) / 1000).toFixed(2);
  document.getElementById('time').textContent = elapsedTime;
}, 1000);

// Ajoute un écouteur d'événement pour la touche Entrée
document.getElementById('answer').addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    checkAnswer();
  }
});
