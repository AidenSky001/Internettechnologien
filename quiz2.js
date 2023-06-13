fetch('https://irene.informatik.htw-dresden.de:8888/api/quizzes') // Passe die URL deines Servers an
  .then(response => response.json())
  .then(data => {
    const questions = data.content;
    const cardContainer = document.getElementById('card-container'); // Passe die ID des Container-Elements an
    const scoreContainer = document.getElementById('score-container'); // Passe die ID des Container-Elements für den Punktestand an
    let score = 0;
    let currentQuestionIndex = 0;

    displayNextQuestion();

    function displayNextQuestion() {
      if (currentQuestionIndex >= questions.length || currentQuestionIndex >= 5) {
        displayFinalScore();
        return;
      }

      cardContainer.innerHTML = ''; // Leere den Container

      const question = questions[currentQuestionIndex];
      const card = document.createElement('div');
      card.classList.add('demo-card-event', 'mdl-card', 'mdl-shadow--2dp');

      const cardTitle = document.createElement('div');
      cardTitle.classList.add('mdl-card__title', 'mdl-card--expand');

      const title = document.createElement('h4');
      title.textContent = question.text; // Frage aus der serverseitigen Antwort

      cardTitle.appendChild(title);
      card.appendChild(cardTitle);

      question.options.forEach((answer, index) => {
        const cardAction = document.createElement('div');
        cardAction.classList.add('mdl-card__actions', 'mdl-card--border');

        const button = document.createElement('a');
        button.classList.add('mdl-button', 'mdl-button--colored', 'mdl-js-button', 'mdl-js-ripple-effect');
        button.textContent = answer;

        button.addEventListener('click', () => checkAnswer(index)); // Füge den Event-Listener hinzu

        cardAction.appendChild(button);
        card.appendChild(cardAction);
      });

      cardContainer.appendChild(card);
    }

    function checkAnswer(selectedIndex) {
      const question = questions[currentQuestionIndex];

      if (selectedIndex === question.a) {
        score++;
      }

      currentQuestionIndex++;

      displayNextQuestion();
    }

    function displayFinalScore() {
      cardContainer.innerHTML = ''; // Leere den Container

      const finalScoreMessage = document.createElement('h3');
      finalScoreMessage.textContent = `Dein Punktestand: ${score}/${Math.min(questions.length, 5)}`;

      scoreContainer.appendChild(finalScoreMessage);
    }
  });
