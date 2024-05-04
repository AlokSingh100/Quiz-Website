const quizData = [
  
    {
        question: 'When did World War I begin?',
        options: ['1914', '1918', '1939', '1945'],
        answer: '1914'
      },
      {
        question: 'Who was the first president of the United States?',
        options: ['Thomas Jefferson', 'George Washington', 'Abraham Lincoln', 'John Adams'],
        answer: 'George Washington'
      },
      {
        question: 'When was the Declaration of Independence adopted?',
        options: ['1776', '1789', '1812', '1865'],
        answer: '1776'
      },
      {
        question: 'Who was the first female Prime Minister of the United Kingdom?',
        options: ['Margaret Thatcher', 'Theresa May', 'Indira Gandhi', 'Angela Merkel'],
        answer: 'Margaret Thatcher'
      },
      {
        question: 'In which year did the Titanic sink?',
        options: ['1912', '1914', '1920', '1930'],
        answer: '1912'
      },
      {
        question: 'Who wrote "The Communist Manifesto"?',
        options: ['Karl Marx and Friedrich Engels', 'Vladimir Lenin', 'Joseph Stalin', 'Mao Zedong'],
        answer: 'Karl Marx and Friedrich Engels'
      },
      {
        question: 'When did the Cold War end?',
        options: ['1989', '1991', '1975', '1995'],
        answer: '1991'
      },
      {
        question: 'Which ancient civilization built the pyramids of Giza?',
        options: ['Sumerians', 'Greeks', 'Egyptians', 'Romans'],
        answer: 'Egyptians'
      },
      {
        question: 'Who was the leader of the Soviet Union during World War II?',
        options: ['Vladimir Putin', 'Joseph Stalin', 'Leon Trotsky', 'Nikita Khrushchev'],
        answer: 'Joseph Stalin'
      },
      {
        question: 'What year did Christopher Columbus first reach the Americas?',
        options: ['1492', '1517', '1521', '1607'],
        answer: '1492'
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
