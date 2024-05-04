const quizData = [
  {
    question: 'Which HTML element is used for specifying a JavaScript source file?',
    options: ['<js>', '<script>', '<source>', '<link>'],
    answer: '<script>'
  },
  {
    question: 'What is the correct syntax for referring to an external script called "app.js"?',
    options: ['<script src="app.js">', '<script href="app.js">', '<script ref="app.js">', '<script name="app.js">'],
    answer: '<script src="app.js">'
  },
  {
    question: 'How do you write "Hello World" in an alert box?',
    options: ['msg("Hello World");', 'alertBox("Hello World");', 'alert("Hello World");', 'msgBox("Hello World");'],
    answer: 'alert("Hello World");'
  },
  {
    question: 'Which CSS property controls the text size?',
    options: ['font-style', 'text-size', 'font-size', 'text-style'],
    answer: 'font-size'
  },
  {
    question: 'How do you create a function in JavaScript?',
    options: ['function = myFunction()', 'function:myFunction()', 'function myFunction()', 'function => myFunction()'],
    answer: 'function myFunction()'
  },
  {
    question: 'How do you call a function named "myFunction"?',
    options: ['call function myFunction()', 'call myFunction()', 'myFunction()', 'execute myFunction()'],
    answer: 'myFunction()'
  },
  {
    question: 'How to write an IF statement in JavaScript?',
    options: ['if i = 5 then', 'if i == 5 then', 'if (i == 5)', 'if i = 5'],
    answer: 'if (i == 5)'
  },
  {
    question: 'How does a WHILE loop start?',
    options: ['while (i <= 10; i++)', 'while i = 1 to 10', 'while (i <= 10)', 'while (i++)'],
    answer: 'while (i <= 10)'
  },
  {
    question: 'How can you add a comment in a JavaScript?',
    options: ['//This is a comment', '<!--This is a comment-->', "'This is a comment", '`This is a comment`'],
    answer: '//This is a comment'
  },
  {
    question: 'What is the correct way to write a JavaScript array?',
    options: ['var colors = "red", "green", "blue"', 'var colors = (1:"red", 2:"green", 3:"blue")', 'var colors = ["red", "green", "blue"]', 'var colors = 1 = ("red"), 2 = ("green"), 3 = ("blue")'],
    answer: 'var colors = ["red", "green", "blue"]'
  }
]
;
const quizContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('result');
const submitButton = document.getElementById('submit');
const retryButton = document.getElementById('retry');
const showAnswerButton = document.getElementById('showAnswer');
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