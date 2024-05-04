const quizData = [
  
    {
        question: 'What is PHP?',
        options: ['A programming language for front-end development', 'A server-side scripting language', 'A database management system', 'A markup language'],
        answer: 'A server-side scripting language'
      },
      {
        question: 'Who is the creator of PHP?',
        options: ['Guido van Rossum', 'Rasmus Lerdorf', 'Larry Wall', 'Brendan Eich'],
        answer: 'Rasmus Lerdorf'
      },
      {
        question: 'Which symbol is used for comments in PHP?',
        options: ['//', '#', '/', '*'],
        answer: '//'
      },
      {
        question: 'What is the extension of a PHP file?',
        options: ['.php', '.html', '.js', '.css'],
        answer: '.php'
      },
      {
        question: 'Which function is used to output data in PHP?',
        options: ['echo', 'print', 'display', 'show'],
        answer: 'echo'
      },
      {
        question: 'What is the correct way to start a PHP block?',
        options: ['<?php', '<?', '<script>', '<php>'],
        answer: '<?php'
      },
      {
        question: 'Which superglobal variable is used to collect form data after submitting an HTML form with the method "post"?',
        options: ['$_GET', '$_POST', '$_REQUEST', '$_SERVER'],
        answer: '$_POST'
      },
      {
        question: 'What does PHP stand for?',
        options: ['Personal Hypertext Processor', 'Private Home Page', 'PHP: Hypertext Preprocessor', 'Public Hosting Platform'],
        answer: 'PHP: Hypertext Preprocessor'
      },
      {
        question: 'Which function is used to include a file in PHP?',
        options: ['require()', 'import()', 'include()', 'load()'],
        answer: 'include()'
      },
      {
        question: 'Which operator is used for concatenating strings in PHP?',
        options: ['+', '.', '-', '*'],
        answer: '.'
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
