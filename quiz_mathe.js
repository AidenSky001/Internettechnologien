let score = 0;
let currentQuestionIndex = 0;

fetch('fragen.json')
  .then(response => response.json())
  .then(data => {
    const questions = data['teil-mathe'];
    const cardContainer = document.getElementById('card-container');
    const scoreContainer = document.getElementById('score-container');
  

    displayNextQuestion();

    function displayNextQuestion() {
        if (currentQuestionIndex >= questions.length || currentQuestionIndex >= 5) {
          displayFinalScore();
          return;
        }
      
        cardContainer.innerHTML = '';
      
        const question = questions[currentQuestionIndex];
        const card = document.createElement('div');
        card.classList.add('demo-card-event', 'mdl-card', 'mdl-shadow--2dp');
      
        const cardTitle = document.createElement('div');
        cardTitle.classList.add('mdl-card__title', 'mdl-card--expand');
      
        const title = document.createElement('h4');
        title.textContent = question.f;
      
        cardTitle.appendChild(title);
        card.appendChild(cardTitle);
      
        question.l.forEach((answer, index) => {
            const cardAction = document.createElement('div');
            cardAction.classList.add('mdl-card__actions', 'mdl-card--border');
          
            const button = document.createElement('a');
            button.classList.add('mdl-button', 'mdl-button--colored', 'mdl-js-button', 'mdl-js-ripple-effect');
          
            const answerSpan = document.createElement('span');
            answerSpan.innerHTML = katex.renderToString(answer);
          
            button.appendChild(answerSpan);
          
            button.addEventListener('click', () => checkAnswer(index));
          
            cardAction.appendChild(button);
            card.appendChild(cardAction);
          });
          
          
          
          
      
        cardContainer.appendChild(card);
      }

    function checkAnswer(selectedIndex) {
      const question = questions[currentQuestionIndex];
      const progressElement = document.getElementById('p3');

      if (selectedIndex === question.a) {
        score++;
        progressElement.MaterialProgress.setProgress(0 + (score * 20));
      } else {
        progressElement.MaterialProgress.setBuffer(0 + (score * 20));
      }

      currentQuestionIndex++;
      displayNextQuestion();
    }

    function displayFinalScore() {
      cardContainer.innerHTML = '';

      const finalScoreMessage = document.createElement('h3');
      finalScoreMessage.textContent = `Dein Punktestand: ${score}/${Math.min(questions.length, 5)}`;

      scoreContainer.appendChild(finalScoreMessage);
    }
  });

document.querySelector('#p3').addEventListener('mdl-componentupgraded', function() {
  this.MaterialProgress.setProgress(0 + (score * 20));
  this.MaterialProgress.setBuffer(0);
});
