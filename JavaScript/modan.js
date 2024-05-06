const quizData = [
  
    {
        question: 'Who was the first President of the United States?',
        options: ['Thomas Jefferson', 'Abraham Lincoln', 'George Washington', 'John Adams'],
        answer: 'George Washington'
      },
      {
        question: 'In which year did World War II end?',
        options: ['1945', '1939', '1941', '1950'],
        answer: '1945'
      },
      {
        question: 'Who was the leader of the Soviet Union during the Cuban Missile Crisis?',
        options: ['Nikita Khrushchev', 'Joseph Stalin', 'Leonid Brezhnev', 'Mikhail Gorbachev'],
        answer: 'Nikita Khrushchev'
      },
      {
        question: 'Which event marked the beginning of the French Revolution?',
        options: ['Storming of the Bastille', 'Execution of Louis XVI', 'Reign of Terror', 'Battle of Waterloo'],
        answer: 'Storming of the Bastille'
      },
      {
        question: 'Who was the first woman to win a Nobel Prize?',
        options: ['Marie Curie', 'Rosa Parks', 'Mother Teresa', 'Jane Addams'],
        answer: 'Marie Curie'
      },
      {
        question: 'Which country was divided into East and West Germany after World War II?',
        options: ['France', 'Italy', 'Germany', 'Poland'],
        answer: 'Germany'
      },
      {
        question: 'What was the name of the first artificial satellite launched into space?',
        options: ['Sputnik 1', 'Apollo 11', 'Vostok 1', 'Explorer 1'],
        answer: 'Sputnik 1'
      },
      {
        question: 'Who was the first woman to serve as Prime Minister of the United Kingdom?',
        options: ['Margaret Thatcher', 'Theresa May', 'Indira Gandhi', 'Angela Merkel'],
        answer: 'Margaret Thatcher'
      },
      {
        question: 'Which two countries were involved in the Cold War?',
        options: ['United States and Japan', 'United States and Soviet Union', 'Germany and France', 'China and India'],
        answer: 'United States and Soviet Union'
      },
      {
        question: 'What was the major event that led to the start of World War I?',
        options: ['Assassination of Archduke Franz Ferdinand', 'Treaty of Versailles', 'Bombing of Pearl Harbor', 'Invasion of Poland'],
        answer: 'Assassination of Archduke Franz Ferdinand'
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
