const quizData = [
    
    {
        question: 'Which ancient civilization built the Great Pyramids of Giza?',
        options: ['Mesopotamians', 'Greeks', 'Egyptians', 'Romans'],
        answer: 'Egyptians'
      },
      {
        question: 'Who was the first emperor of ancient China?',
        options: ['Confucius', 'Qin Shi Huang', 'Sun Tzu', 'Emperor Wu'],
        answer: 'Qin Shi Huang'
      },
      {
        question: 'What is the name of the ancient Greek city-state known for its military prowess?',
        options: ['Sparta', 'Athens', 'Thebes', 'Corinth'],
        answer: 'Sparta'
      },
      {
        question: 'Which ancient civilization built the city of Machu Picchu?',
        options: ['Mayans', 'Aztecs', 'Incas', 'Olmecs'],
        answer: 'Incas'
      },
      {
        question: 'Who was the first emperor of the Roman Empire?',
        options: ['Augustus', 'Julius Caesar', 'Nero', 'Constantine'],
        answer: 'Augustus'
      },
      {
        question: 'Which ancient civilization is credited with inventing the concept of democracy?',
        options: ['Egyptians', 'Persians', 'Greeks', 'Romans'],
        answer: 'Greeks'
      },
      {
        question: 'Which ancient civilization developed the first known writing system?',
        options: ['Sumerians', 'Minoans', 'Phoenicians', 'Babylonians'],
        answer: 'Sumerians'
      },
      {
        question: 'Who was the founder of Buddhism?',
        options: ['Confucius', 'Siddhartha Gautama', 'Laozi', 'Ashoka'],
        answer: 'Siddhartha Gautama'
      },
      {
        question: 'What is the name of the ancient Egyptian writing system characterized by pictorial symbols?',
        options: ['Hieroglyphics', 'Cuneiform', 'Alphabet', 'Phoenician'],
        answer: 'Hieroglyphics'
      },
      {
        question: 'Which ancient civilization is associated with the Epic of Gilgamesh?',
        options: ['Egyptians', 'Sumerians', 'Persians', 'Greeks'],
        answer: 'Sumerians'
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
  