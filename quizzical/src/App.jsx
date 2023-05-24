
import './App.css'
import Start from './Start'
import Quiz from './Quiz'
import React, { useState, useEffect } from 'react'

function App() {
  const [start, setStart] = useState(false)
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=10")
      .then(res => res.json())
      .then(data => setQuestions(data))
  }, [])

  function toggleStart() {
    setStart(prevStart => !prevStart)
    console.log(start)
    console.log(questions.results)
  }

  return (
    <div>
      {!start &&
      <Start
        startQuiz={() => toggleStart()}
      />
      }
      {start &&
      <Quiz
        
      />
      }
    </div>
  )
}

export default App
