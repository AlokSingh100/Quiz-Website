const quizData = [
    {
        question: 'Who is the current President of the United States?',
        options: ['Joe Biden', 'Donald Trump', 'Barack Obama', 'Hillary Clinton'],
        answer: 'Joe Biden'
      },
      {
        question: 'What is the capital of France?',
        options: ['Berlin', 'Madrid', 'Rome', 'Paris'],
        answer: 'Paris'
      },
      {
        question: 'Who is the Prime Minister of the United Kingdom?',
        options: ['Theresa May', 'David Cameron', 'Boris Johnson', 'Tony Blair'],
        answer: 'Boris Johnson'
      },
      {
        question: 'Which country is known as the "Land of the Rising Sun"?',
        options: ['China', 'Japan', 'South Korea', 'Vietnam'],
        answer: 'Japan'
      },
      {
        question: 'Who is the Chancellor of Germany?',
        options: ['Angela Merkel', 'Emmanuel Macron', 'Vladimir Putin', 'Justin Trudeau'],
        answer: 'Angela Merkel'
      },
      {
        question: 'What is the political system of the United States?',
        options: ['Monarchy', 'Republic', 'Dictatorship', 'Communism'],
        answer: 'Republic'
      },
      {
        question: 'Who was the first female Prime Minister of India?',
        options: ['Indira Gandhi', 'Sonia Gandhi', 'Margaret Thatcher', 'Angela Merkel'],
        answer: 'Indira Gandhi'
      },
      {
        question: 'What is the capital of Russia?',
        options: ['Moscow', 'St. Petersburg', 'Kiev', 'Berlin'],
        answer: 'Moscow'
      },
      {
        question: 'What is the United Nations?',
        options: ['A global organization to promote peace and cooperation', 'An international sports federation', 'A political party', 'A military alliance'],
        answer: 'A global organization to promote peace and cooperation'
      },
      {
        question: 'Who is the current President of Russia?',
        options: ['Vladimir Putin', 'Dmitry Medvedev', 'Boris Yeltsin', 'Mikhail Gorbachev'],
        answer: 'Vladimir Putin'
      }

];

  const quizContainer = document.getElementById('quiz');
  const resultContainer = document.getElementById('result');
  const submitButton = document.getElementById('submit');
  const retryButton = document.getElementById('retry');
  const showAnswerButton = document.getElementById('showAnswer');
  const homePageButton = document.getElementById('HomePage');
  let currentQuestion = 0;
  let score = 0;
  let incorrectAnswers = [];
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
function displayQuestion() {
  const questionData = quizData[currentQuestion];
  const questionElement = document.createElement('div');
  questionElement.className = 'question';
  questionElement.innerHTML = questionData.question;

  const optionsElement = document.createElement('div');
  optionsElement.className = 'options';

  const shuffledOptions = [...questionData.options];
  shuffleArray(shuffledOptions);
  for (let i = 0; i < shuffledOptions.length; i++) {
    const option = document.createElement('label');
    option.className = 'option';
    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = 'quiz';
    radio.value = shuffledOptions[i];
    const optionText = document.createTextNode(shuffledOptions[i]);
    option.appendChild(radio);
    option.appendChild(optionText);
    optionsElement.appendChild(option);
  }

  quizContainer.innerHTML = '';
  quizContainer.appendChild(questionElement);
  quizContainer.appendChild(optionsElement);
}

function checkAnswer() {
  const selectedOption = document.querySelector('input[name="quiz"]:checked');
  if (selectedOption) {
    const answer = selectedOption.value;
    if (answer === quizData[currentQuestion].answer) {
      score++;
    } else {
      incorrectAnswers.push({
        question: quizData[currentQuestion].question,
        incorrectAnswer: answer,
        correctAnswer: quizData[currentQuestion].answer,
      });
    }
    currentQuestion++;
    selectedOption.checked = false;
    if (currentQuestion < quizData.length) {
      displayQuestion();
    } else {
      displayResult();
    }
  }
}
function displayResult() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'inline-block';
    homePageButton.style.display = 'inline-block'; // Show home button on result
    resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
  }
function retryQuiz() {
  currentQuestion = 0;
  score = 0;
  incorrectAnswers = [];
  quizContainer.style.display = 'block';
  submitButton.style.display = 'inline-block';
  retryButton.style.display = 'none';
  showAnswerButton.style.display = 'none';
  resultContainer.innerHTML = '';
  displayQuestion();
}
function showAnswer() {
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  retryButton.style.display = 'inline-block';
  showAnswerButton.style.display = 'none';

  let incorrectAnswersHtml = '';
  for (let i = 0; i < incorrectAnswers.length; i++) {
    incorrectAnswersHtml += `
      <p>
        <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
        <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
        <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
      </p>
    `;
  }
  resultContainer.innerHTML = `
    <p>You scored ${score} out of ${quizData.length}!</p>
    <p>Incorrect Answers:</p>
    ${incorrectAnswersHtml}
  `;
}
submitButton.addEventListener('click', checkAnswer);
retryButton.addEventListener('click', retryQuiz);
showAnswerButton.addEventListener('click', showAnswer);


displayQuestion();
