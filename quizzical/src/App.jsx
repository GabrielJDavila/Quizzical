
import './App.css'
import Start from './Start'
import Quiz from './Quiz'
import React, { useState, useEffect } from 'react'
import { decode } from 'html-entities'

function App() {
  const [start, setStart] = useState(false)
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=10&category=15&difficulty=medium&type=multiplhttps://opentdb.com/api.php?amount=10&category=15&difficulty=easy&type=multiple")
      .then(res => res.json())
      .then(data => setQuestions(data.results))
  }, [])

  function toggleStart() {
    setStart(prevStart => !prevStart)
    console.log(questions)
  }
  
  const questionText =
    questions.map((question, index) => {
      return (
        <Quiz
          key={index}
          questionText={decode(question.question)}
          correctAnswer={decode(question.correct_answer)}
          incorrectAnswer1={decode(question.incorrect_answers[0])}
          incorrectAnswer2={decode(question.incorrect_answers[1])}
          incorrectAnswer3={decode(question.incorrect_answers[2])}
        />
      )
    })

  return (
    <div>
      {!start &&
      <Start
        startQuiz={() => toggleStart()}
      />
      }
      {start &&
      questionText
      }
    </div>
  )
}

export default App
