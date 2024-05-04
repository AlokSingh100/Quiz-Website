const quizData = [
    {
      question: 'What is C?',
      options: ['A high-level programming language', 'A markup language', 'A scripting language', 'A database management system'],
      answer: 'A high-level programming language'
    },
    {
      question: 'Who is the creator of the C programming language?',
      options: ['Guido van Rossum', 'Dennis Ritchie', 'Larry Wall', 'Brendan Eich'],
      answer: 'Dennis Ritchie'
    },
    {
      question: 'Which keyword is used to define a function in C?',
      options: ['def', 'func', 'function', 'int'],
      answer: 'int'
    },
    {
      question: 'What is the entry point for a C program?',
      options: ['start()', 'run()', 'main()', 'begin()'],
      answer: 'main()'
    },
    {
      question: 'Which symbol is used for comments in C?',
      options: ['//', '#', '/', '*'],
      answer: '//'
    },
    {
      question: 'Which data type is used to store single characters in C?',
      options: ['char', 'Character', 'string', 'int'],
      answer: 'char'
    },
    {
      question: 'What is the output of 5 % 2 in C?',
      options: ['2', '2.5', '1', '0'],
      answer: '1'
    },
    {
      question: 'Which operator is used to dereference a pointer in C?',
      options: ['*', '&', '->', '.'],
      answer: '*'
    },
    {
      question: 'Which header file is used to input and output functions in C?',
      options: ['<input.h>', '<stdio.h>', '<io.h>', '<file.h>'],
      answer: '<stdio.h>'
    },
    {
      question: 'What is the purpose of the "sizeof" operator in C?',
      options: ['To determine the size of a variable or data type', 'To perform arithmetic operations', 'To declare functions', 'To define arrays'],
      answer: 'To determine the size of a variable or data type'
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
  