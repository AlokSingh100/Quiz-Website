const quizData = [
  
  {
    question: 'What is JavaScript?',
    options: ['A markup language', 'A programming language', 'A database management system', 'A server-side scripting language'],
    answer: 'A programming language'
  },
  {
    question: 'Who developed JavaScript?',
    options: ['Microsoft', 'Netscape', 'Oracle', 'IBM'],
    answer: 'Netscape'
  },
  {
    question: 'Which keyword is used to declare variables in JavaScript?',
    options: ['var', 'let', 'const', 'int'],
    answer: 'var'
  },
  {
    question: 'What is the correct way to write a comment in JavaScript?',
    options: ['// This is a comment', '<!-- This is a comment -->', '/ This is a comment /', '* This is a comment *'],
    answer: '// This is a comment'
  },
  {
    question: 'What is the output of 5 + "5" in JavaScript?',
    options: ['10', '55', 'Error', 'Undefined'],
    answer: '55'
  },
  {
    question: 'Which function is used to print data in the console in JavaScript?',
    options: ['print()', 'log()', 'console()', 'write()'],
    answer: 'console.log()'
  },
  {
    question: 'What does DOM stand for in JavaScript?',
    options: ['Document Object Model', 'Data Object Model', 'Document Order Method', 'Dynamic Object Manipulation'],
    answer: 'Document Object Model'
  },
  {
    question: 'What is the result of typeof NaN in JavaScript?',
    options: ['number', 'NaN', 'undefined', 'object'],
    answer: 'number'
  },
  {
    question: 'Which operator is used for strict equality in JavaScript?',
    options: ['==', '===', '=', '!='],
    answer: '==='
  },
  {
    question: 'What is an array in JavaScript?',
    options: ['A special type of object', 'A data type to store multiple values', 'A function', 'A loop construct'],
    answer: 'A special type of object'
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
