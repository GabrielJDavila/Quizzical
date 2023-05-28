
import './App.css'
import Start from './Start'
import Quiz from './Quiz'
import React, { useState, useEffect } from 'react'
import { decode } from 'html-entities'

function App() {
  const [start, setStart] = useState(false)
  const [questions, setQuestions] = useState([])
  const [answers, setAnswers] = useState([])
  const [isSelected, setIsSelected] = useState(false)
  const [score, setScore] = useState(0)

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=10&category=15&difficulty=medium&type=multiplhttps://opentdb.com/api.php?amount=10&category=15&difficulty=easy&type=multiple")
      .then(res => res.json())
      .then(data => {
        const modifiedData = data.results.map(question => {
          const incorrectAnswers = [...question.incorrect_answers, question.correct_answer]
          const shuffledAnswers = shuffleArray(incorrectAnswers)
          
          const answers = shuffledAnswers.map(answer => ({
            answerText: decode(answer),
            isSelected: false,
          }))

          return {
            ...question,
            incorrect_answers: shuffledAnswers,
            answers: answers,
          }
        })
        setQuestions(modifiedData)
      })
  }, [])

  function shuffleArray(array) {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = shuffledArray[i];
      shuffledArray[i] = shuffledArray[j];
      shuffledArray[j] = temp;
    }
    return shuffledArray;
  }  

  function toggleStart() {
    setStart(prevStart => !prevStart)
  }

  function checkAnswer(e, index) {
    questions.map(question => {
      if(question.correct_answer === e.target.textContent) {
        question.answers.map(answer => {
          if(answer.answerText === question.correct_answer) {
            setScore(score + 1)
            console.log(answer)
          }
        })
      }
    })
    
    
  }

  const questionText = questions.map((question, index) => {
    return (
      <Quiz
        checkAnswer={checkAnswer}
        key={index}
        selected={isSelected}
        questionText={decode(question.question)}
        answers={question.answers}
        // incorrectAnswer1={decode(question.incorrect_answers[0])}
        // incorrectAnswer2={decode(question.incorrect_answers[1])}
        // incorrectAnswer3={decode(question.incorrect_answers[2])}
        // incorrectAnswer4={decode(question.incorrect_answers[3])}
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
      {start &&
      <button className="finish-quiz">Check answers</button>
      }
    </div>
  )
}

export default App
