let score = 0;
let currentQuestionIndex = 0;
const progressElement = document.getElementById('p3');

var username = 'test@gmail.com';
var password = 'secret';
var headers = new Headers();
headers.append('Authorization', 'Basic ' + btoa(username + ':' + password));

function fetchQuiz() {
  const baseUrl = 'https://irene.informatik.htw-dresden.de:8888/api/quizzes/';
  const randomIndex = Math.floor(Math.random() * 31) + 2;
  const url = baseUrl + randomIndex;

  fetch(url, {
    method: 'GET',
    headers: headers
  })
    .then(response => response.json())
    .then(data => {
      const question = {
        text: data.text,
        options: data.options
      };

      const cardContainer = document.getElementById('card-container');
      const scoreContainer = document.getElementById('score-container');

      displayNextQuestion();

      function displayNextQuestion() {
        if (currentQuestionIndex >= 5) {
          displayFinalScore();
          return;
        }

        cardContainer.innerHTML = '';

        const card = document.createElement('div');
        card.classList.add('demo-card-event', 'mdl-card', 'mdl-shadow--2dp');

        const cardTitle = document.createElement('div');
        cardTitle.classList.add('mdl-card__title', 'mdl-card--expand');

        const title = document.createElement('h4');
        title.textContent = question.text;

        cardTitle.appendChild(title);
        card.appendChild(cardTitle);

        question.options.forEach((answer, index) => {
          const cardAction = document.createElement('div');
          cardAction.classList.add('mdl-card__actions', 'mdl-card--border');

          const button = document.createElement('a');
          button.classList.add('mdl-button', 'mdl-button--colored', 'mdl-js-button', 'mdl-js-ripple-effect');
          button.textContent = answer;

          button.addEventListener('click', () => checkAnswer(index));

          cardAction.appendChild(button);
          card.appendChild(cardAction);
        });

        cardContainer.appendChild(card);
      }

      function checkAnswer(selectedIndex) {
        const selectedOption = selectedIndex + 1; // Index von 0 auf 1-basiert ändern

        const solveURL = `https://irene.informatik.htw-dresden.de:8888/api/quizzes/${randomIndex}/solve`;
        const postData = [selectedIndex + 1];

        console.log('Daten, die an den Server geschickt werden:', postData, randomIndex);
        // POST-Anfrage an den Server
        fetch(solveURL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + btoa(username + ':' + password)
          },
          body: JSON.stringify(postData)
        })
          .then(response => response.json())
          .then(responseData => {
            if (responseData.success) {
              score++;
              progressElement.MaterialProgress.setProgress(0 + (score * 20));
            } else {
              progressElement.MaterialProgress.setBuffer(0 + (score * 20));
            }

            currentQuestionIndex++;
            fetchQuiz(); // Rekursiver Aufruf der Funktion, um die nächste Frage zu laden
          });
      }

      function displayFinalScore() {
        cardContainer.innerHTML = '';

        const finalScoreMessage = document.createElement('h3');
        finalScoreMessage.textContent = `Dein Punktestand: ${score}/5`;

        scoreContainer.appendChild(finalScoreMessage);
      }
    });
}

fetchQuiz();
