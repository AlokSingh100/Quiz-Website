const quizData = [
    {
        question: 'What does SQL stand for?',
        options: ['Structured Query Language', 'Sequential Query Language', 'Systematic Query Language', 'Structured Question Language'],
        answer: 'Structured Query Language'
      },
      {
        question: 'Which keyword is used to retrieve data from a database in SQL?',
        options: ['SELECT', 'GET', 'RETRIEVE', 'FETCH'],
        answer: 'SELECT'
      },
      {
        question: 'What is the command used to create a new table in SQL?',
        options: ['CREATE TABLE', 'NEW TABLE', 'MAKE TABLE', 'DEFINE TABLE'],
        answer: 'CREATE TABLE'
      },
      {
        question: 'Which SQL clause is used to filter records based on a specified condition?',
        options: ['FILTER BY', 'LIMIT', 'WHERE', 'CONDITION'],
        answer: 'WHERE'
      },
      {
        question: 'What is the command used to delete a table in SQL?',
        options: ['DROP TABLE', 'DELETE TABLE', 'REMOVE TABLE', 'ERASE TABLE'],
        answer: 'DROP TABLE'
      },
      {
        question: 'Which SQL function is used to return the number of rows in a result set?',
        options: ['ROWS()', 'COUNT()', 'LENGTH()', 'SIZE()'],
        answer: 'COUNT()'
      },
      {
        question: 'Which SQL clause is used to sort the result set in ascending order?',
        options: ['SORT ASC', 'ORDER BY DESC', 'ASCENDING', 'ORDER ASC'],
        answer: 'ORDER BY ASC'
      },
      {
        question: 'What is the command used to update data in a table in SQL?',
        options: ['UPDATE', 'MODIFY', 'CHANGE', 'ALTER'],
        answer: 'UPDATE'
      },
      {
        question: 'Which SQL statement is used to insert new records into a table?',
        options: ['ADD', 'INSERT INTO', 'SET', 'CREATE'],
        answer: 'INSERT INTO'
      },
      {
        question: 'Which SQL clause is used to combine rows from two or more tables?',
        options: ['UNION', 'COMBINE', 'JOIN', 'MERGE'],
        answer: 'JOIN'
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
