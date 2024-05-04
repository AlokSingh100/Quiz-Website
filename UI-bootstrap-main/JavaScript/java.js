const quizData = [
  
    {
      question: 'What is Java?',
      options: ['A scripting language', 'A markup language', 'An object-oriented programming language', 'A database management system'],
      answer: 'An object-oriented programming language'
    },
    {
      question: 'Who developed Java?',
      options: ['Microsoft', 'Apple', 'Oracle', 'Sun Microsystems'],
      answer: 'Sun Microsystems'
    },
    {
      question: 'Which keyword is used to define a class in Java?',
      options: ['class', 'Class', 'ClassName', 'define'],
      answer: 'class'
    },
    {
      question: 'What is the entry point for a Java program?',
      options: ['main()', 'start()', 'run()', 'execute()'],
      answer: 'main()'
    },
    {
      question: 'What is the purpose of the "new" keyword in Java?',
      options: ['To create a new instance of a class', 'To declare a variable', 'To initialize an array', 'To define a method'],
      answer: 'To create a new instance of a class'
    },
    {
      question: 'What is a constructor in Java?',
      options: ['A method used to initialize an object', 'A variable used to store data', 'A loop construct', 'A conditional statement'],
      answer: 'A method used to initialize an object'
    },
    {
      question: 'Which access modifier is used to specify that a method or variable can be accessed by any other class?',
      options: ['public', 'private', 'protected', 'default'],
      answer: 'public'
    },
    {
      question: 'What is the purpose of inheritance in Java?',
      options: ['To create objects', 'To define interfaces', 'To reuse code and establish relationships between classes', 'To handle exceptions'],
      answer: 'To reuse code and establish relationships between classes'
    },
    {
      question: 'What is the output of 10 % 3 in Java?',
      options: ['3', '1', '0', '10'],
      answer: '1'
    },
    {
      question: 'Which data type in Java is used to store single characters?',
      options: ['char', 'Character', 'string', 'int'],
      answer: 'char'
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
  