const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'What is 69*69 ?',
    answers: [
      { text: '4896', correct: false },
      { text: '4716', correct: true },
      { text: '3745', correct: false },
      { text: '3456', correct: false }
    ]
  },
  {
    question: 'What is 81*4 ?',
    answers: [
      { text: '365', correct: false },
      { text: '324', correct: true },
      { text: '833', correct: false },
      { text: '526', correct: false }
    ]
  },
  {
    question: 'What is 99*15 ?',
    answers: [
      { text: '2363', correct: false },
      { text: '2345', correct: false },
      { text: '1485', correct: true },
      { text: '2346', correct: false }
    ]
  },
  {
    question: 'What is 47*65 ?',
    answers: [
      { text: '2375', correct: false },
      { text: '3055', correct: true },
      { text: '4896', correct: false },
      { text: '3766', correct: false }
    ]

  },
  {
    question: 'What is 281364/4 ?',
    answers: [
      { text: '7524', correct: false },
      { text: '7341', correct: true },
      { text: '5657', correct: false },
      { text: '7361', correct: false }
    ]
    
  },
  {
    question: 'What is the meaning of "cell" ?',
    answers: [
      { text: 'Mobile', correct: true },
      { text: 'Jail', correct: true },
      { text: 'Battery', correct: true }
    ]
    
  },
  {
    question: 'What is the meaning of "Phenomenon" ?',
    answers: [
      { text: 'fact or situation that is observed to exist or happen', correct: true },
      { text: 'something going wrong', correct: false },
      { text: 'someone who is not good', correct: false }
    ]
    
  }
]