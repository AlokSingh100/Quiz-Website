const quizData = [
  
    {
      question: 'What is Bootstrap?',
      options: ['A programming language', 'A front-end framework', 'A database management system', 'A server-side scripting language'],
      answer: 'A front-end framework'
    },
    {
      question: 'Which CSS framework is Bootstrap built on?',
      options: ['Foundation', 'Materialize', 'Bulma', 'Sass'],
      answer: 'Sass'
    },
    {
      question: 'Which class is used to create a responsive fixed-width container in Bootstrap?',
      options: ['.container', '.container-fluid', '.container-fixed', '.container-responsive'],
      answer: '.container'
    },
    {
      question: 'In Bootstrap, which class is used to create a navigation bar?',
      options: ['.navbar', '.nav', '.navbar-nav', '.nav-bar'],
      answer: '.navbar'
    },
    {
      question: 'Which version of Bootstrap introduced the grid system based on Flexbox?',
      options: ['Bootstrap 3', 'Bootstrap 4', 'Bootstrap 5', 'Bootstrap Flex'],
      answer: 'Bootstrap 4'
    },
    {
      question: 'What is the default breakpoint for Bootstrap\'s grid system?',
      options: ['Extra small (xs)', 'Small (sm)', 'Medium (md)', 'Large (lg)'],
      answer: 'Medium (md)'
    },
    {
      question: 'Which class is used to create a responsive image in Bootstrap?',
      options: ['.responsive-img', '.img-responsive', '.img-fluid', '.fluid-img'],
      answer: '.img-fluid'
    },
    {
      question: 'Which utility class is used to create spacing between Bootstrap columns?',
      options: ['.spacing', '.gutter', '.gap', '.margins'],
      answer: '.gutter'
    },
    
    {
      question: 'Which class is used to create a responsive table in Bootstrap?',
      options: ['.table-responsive', '.responsive-table', '.fluid-table', '.table-fluid'],
      answer: '.table-responsive'
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
  