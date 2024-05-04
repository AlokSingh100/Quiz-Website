const quizData = [
  
    {
      question: 'What is React?',
      options: ['A back-end framework', 'A JavaScript library for building user interfaces', 'A programming language', 'A database management system'],
      answer: 'A JavaScript library for building user interfaces'
    },
    {
      question: 'Which company developed React.js?',
      options: ['Google', 'Facebook', 'Microsoft', 'Amazon'],
      answer: 'Facebook'
    },
    {
      question: 'What is JSX in React?',
      options: ['A syntax extension for JavaScript', 'A programming language', 'A built-in React component', 'A CSS preprocessor'],
      answer: 'A syntax extension for JavaScript'
    },
    {
      question: 'What function is used to render a React component to the DOM?',
      options: ['renderComponent()', 'mount()', 'attach()', 'ReactDOM.render()'],
      answer: 'ReactDOM.render()'
    },
    {
      question: 'What is the virtual DOM in React?',
      options: ['A type of DOM element', 'An alternative to the actual DOM', 'A data structure that represents the actual DOM', 'A rendering engine in React'],
      answer: 'A data structure that represents the actual DOM'
    },
    {
      question: 'Which method is used to change the state of a React component?',
      options: ['this.setState()', 'this.updateState()', 'this.modifyState()', 'this.changeState()'],
      answer: 'this.setState()'
    },
    {
      question: 'What is a prop in React?',
      options: ['A property of a React component', 'A CSS class name', 'A method used to update state', 'A JavaScript keyword'],
      answer: 'A property of a React component'
    },
    {
      question: 'What lifecycle method is called after a component is rendered for the first time?',
      options: ['componentDidMount()', 'componentDidUpdate()', 'componentWillMount()', 'rendered()'],
      answer: 'componentDidMount()'
    },
    {
      question: 'What is the purpose of React Router?',
      options: ['To manage state in React components', 'To create reusable React components', 'To handle routing and navigation in React applications', 'To optimize rendering performance in React'],
      answer: 'To handle routing and navigation in React applications'
    },
    {
      question: 'What is the purpose of the key prop in React lists?',
      options: ['To identify elements in the list', 'To apply styles to list items', 'To trigger event handlers', 'To control component rendering'],
      answer: 'To identify elements in the list'
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
  