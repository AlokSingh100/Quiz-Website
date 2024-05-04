const quizData = [
    {
      question: 'Which sport is known as "The Beautiful Game"?',
      options: ['Basketball', 'Tennis', 'Soccer', 'Golf'],
      answer: 'Soccer'
    },
    {
      question: 'Who is often referred to as the "King of Basketball"?',
      options: ['LeBron James', 'Kobe Bryant', 'Michael Jordan', 'Magic Johnson'],
      answer: 'Michael Jordan'
    },
    {
      question: 'In which country did cricket originate?',
      options: ['India', 'England', 'Australia', 'South Africa'],
      answer: 'England'
    },
    {
      question: 'What is the highest possible break in snooker?',
      options: ['147', '180', '100', '200'],
      answer: '147'
    },
    {
      question: 'Who holds the record for the most Olympic gold medals?',
      options: ['Michael Phelps', 'Usain Bolt', 'Simone Biles', 'Serena Williams'],
      answer: 'Michael Phelps'
    },
    {
      question: 'What is the nickname of the New Zealand national rugby union team?',
      options: ['Kiwis', 'Kangaroos', 'All Blacks', 'Springboks'],
      answer: 'All Blacks'
    },
    {
      question: 'What is the diameter of a basketball hoop in inches?',
      options: ['16 inches', '18 inches', '20 inches', '24 inches'],
      answer: '18 inches'
    },
    {
      question: 'Which tennis player has won the most Grand Slam singles titles?',
      options: ['Rafael Nadal', 'Roger Federer', 'Novak Djokovic', 'Serena Williams'],
      answer: 'Serena Williams'
    },
    {
      question: 'Which country hosted the FIFA World Cup in 2018?',
      options: ['Germany', 'Brazil', 'Russia', 'France'],
      answer: 'Russia'
    },
    {
      question: 'What is the highest possible score in a perfect game of bowling?',
      options: ['200', '250', '300', '350'],
      answer: '300'
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
  