const quizData = [
    {
        question: 'What is Python?',
        options: ['A high-level programming language', 'A database management system', 'A web browser', 'A markup language'],
        answer: 'A high-level programming language'
      },
      {
        question: 'Who is the creator of Python?',
        options: ['Guido van Rossum', 'Larry Page', 'Mark Zuckerberg', 'Elon Musk'],
        answer: 'Guido van Rossum'
      },
      {
        question: 'Which symbol is used for comments in Python?',
        options: ['//', '#', '/', '*'],
        answer: '#'
      },
      {
        question: 'What is the output of 5 + 3 * 2 in Python?',
        options: ['16', '11', '13', '10'],
        answer: '11'
      },
      {
        question: 'Which data type is mutable in Python?',
        options: ['int', 'float', 'list', 'tuple'],
        answer: 'list'
      },
      {
        question: 'What is the keyword used to define a function in Python?',
        options: ['define', 'function', 'def', 'fun'],
        answer: 'def'
      },
      {
        question: 'Which function is used to get the length of a list in Python?',
        options: ['len()', 'length()', 'size()', 'count()'],
        answer: 'len()'
      },
      {
        question: 'What is the output of "hello"[-1] in Python?',
        options: ['o', 'l', 'h', 'e'],
        answer: 'o'
      },
      {
        question: 'Which statement is used to exit a loop prematurely in Python?',
        options: ['break', 'exit', 'end', 'stop'],
        answer: 'break'
      },
      {
        question: 'What is the purpose of the "else" clause in a try-except block in Python?',
        options: ['To handle exceptions', 'To execute code after the try block', 'To define an alternative condition', 'To define an alternative case'],
        answer: 'To execute code after the try block'
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
