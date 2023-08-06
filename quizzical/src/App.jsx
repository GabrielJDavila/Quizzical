
import './App.css'
import Start from './Start'
import Quiz from './Quiz'
import Endgame from './Endgame'
import React, { useState, useEffect } from 'react'
import { decode } from 'html-entities'
import { nanoid } from 'nanoid'

function App() {
  
  const [loading, setLoading] = useState(false)
  const [start, setStart] = useState(false)
  const [questions, setQuestions] = useState([])
  const [checked, setChecked] = React.useState(false)
  const [score, setScore] = useState(0)
  
  useEffect(() => {
    setLoading(true)
    fetch("https://opentdb.com/api.php?amount=10&category=15&difficulty=medium&type=multiplhttps://opentdb.com/api.php?amount=10&category=15&difficulty=easy&type=multiple")
      .then(res => res.json())
      .then(data => {
        setLoading(false)
        const modifiedData = data.results.map(question => {
          const correctAns = question.correct_answer
          const incorrectAnswers = [...question.incorrect_answers, question.correct_answer]
          const shuffledAnswers = shuffleArray(incorrectAnswers)
          const answers = shuffledAnswers.map(answer => ({
            answerText: decode(answer),
            isSelected: false,
            isCorrect: answer === correctAns ? true : false,
            id: nanoid()
          }))
          
          return {
            ...question,
            answers: answers,
            id: nanoid()
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

  function selectButton(questionId, answerId) {
    if(!checked) {
      setQuestions(oldQuestions => oldQuestions.map(question => {
        if(question.id === questionId) {
          return {
            ...question,
            answers: question.answers.map(answer => {
              if(answer.id === answerId) {
                return {...answer, isSelected: true}
              } else {
                return {...answer, isSelected: false}
              }
            })
          }
        } else {
          return question
        }
      }))
    }
  }

  function checkAnswers() {
    setChecked(true)
    questions.map(question => question.answers.map(answer => {
      if(answer.isSelected === true && answer.isCorrect) {
        setScore(prevScore => prevScore + 1)
      }
    }))
  }

  function reload() {
    window.location.reload()
  }
  
  return (
    <div>
      <img
        src="/blob1.png"
        alt="light blue blob"
        className="blue-blob"
      ></img>
      <img
        src="/blob2.png"
        alt="yellow blob"
        className="yellow-blob"
      ></img>
      <div className="quiz-container">
        {!start &&
        <Start
          startQuiz={() => toggleStart()}
        />
        }
        {start && loading &&
        <h2>Loading Quiz...</h2>
        }
        {start &&
        <Quiz
          quizQuestions={questions}
          selectButton={selectButton}
          checked={checked}
        />
        }
        {!checked && start && !loading &&
        <button className="finish-quiz" onClick={checkAnswers}>Check answers</button>
        }
        {
        checked &&
        <Endgame
          totalScore={score}
          reloadGame={reload}
        />
        }
      </div>
    </div>
  )
}

export default App
