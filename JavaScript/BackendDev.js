const quizData = [
    {
      question: "What is the role of a middleware in backend development?",
      options: ["A. Processes data validation and sanitization", "B. Enables communication between different parts of the application", "C. Handles user authentication and authorization", "D. All of the above"],
      answer: "D. All of the above"
    },
    {
      question: "What is the concept of caching used for in backend development?",
      options: ["A. Improves performance by storing frequently accessed data", "B. Reduces database load by reusing previously retrieved data", "C. Both A and B", "D. Neither A nor B"],
      answer: "C. Both A and B"
    },
    {
      question: "What is a common approach to handling errors in backend development?",
      options: ["A. Using try-catch blocks to handle exceptions", "B. Returning meaningful error codes and messages", "C. Logging errors for debugging purposes", "D. All of the above"],
      answer: "D. All of the above"
    },
    {
      question: "What is the purpose of a load balancer in a backend system?",
      options: ["A. Distributes incoming traffic across multiple servers for better performance and scalability", "B. Provides redundancy in case of server failure", "C. Improves security by filtering malicious requests", "D. Both A and B"],
      answer: "D. Both A and B"
    },
    {
      question: "What are some benefits of using a cloud-based backend infrastructure?",
      options: ["A. Scalability to meet changing demands", "B. Cost-effectiveness and pay-as-you-go model", "C. Reduced maintenance and management overhead", "D. All of the above"],
      answer: "D. All of the above"
    },
    {
      question: "What is the difference between asynchronous and synchronous programming in backend development?",
      options: ["A. Asynchronous operations don't block the main thread, while synchronous operations do.", "B. Asynchronous operations are better suited for I/O bound tasks, while synchronous operations are better for CPU bound tasks.", "C. Both A and B", "D. There is no significant difference in backend development."],
      answer: "C. Both A and B"
    },
    {
      question: "What is a common tool used for monitoring and debugging backend applications?",
      options: ["A. Application Performance Monitoring (APM) tools", "B. Log analysis tools", "C. Debuggers", "D. All of the above"],
      answer: "D. All of the above"
    },
    {
      question: "What are some security best practices for backend development?",
      options: ["A. Input validation and sanitization to prevent attacks like SQL injection", "B. Secure password hashing and storage", "C. Regular security audits and vulnerability assessments", "D. All of the above"],
      answer: "D. All of the above"
    },
    {
      question: "What is the role of DevOps in backend development?",
      options: ["A. Bridges the gap between development and operations teams", "B. Automates the deployment and maintenance processes", "C. Ensures continuous integration and delivery (CI/CD)", "D. All of the above"],
      answer: "D. All of the above"
    },
    {
      question: "What are some emerging trends in backend development?",
      options: ["A. Serverless computing for increased scalability and cost efficiency", "B. Microservices architecture for modularity and independent deployments", "C. Focus on containerization technologies like Docker", "D. All of the above"],
      answer: "D. All of the above"
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
  