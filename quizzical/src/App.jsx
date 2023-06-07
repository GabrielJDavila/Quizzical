
import './App.css'
import Start from './Start'
import Quiz from './Quiz'
import React, { useState, useEffect } from 'react'
import { decode } from 'html-entities'
import { nanoid } from 'nanoid'

function App() {
  
  const [start, setStart] = useState(false)
  const [questions, setQuestions] = useState([])
  const [score, setScore] = useState(0)
  
  // function genNewBtn(isCorrect, answer) {
  //   return {
  //     answer: answer,
  //     isCorrect: isCorrect,
  //     isSelected: false,
  //     id: nanoid()
  //   }
  // }
  console.log(questions)
  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=10&category=15&difficulty=medium&type=multiplhttps://opentdb.com/api.php?amount=10&category=15&difficulty=easy&type=multiple")
      .then(res => res.json())
      .then(data => {
        const modifiedData = data.results.map(question => {
          // const quizQuestions = decode(question.question)
          const correctAns = question.correct_answer
          // const incorrectAns = question.incorrect_answers
          // let answersArr = []
          // incorrectAns.map(answer => {
          //   return answersArr.push(genNewBtn(false, decode(incorrectAns)))
          // })
          // const randomNum = Math.floor(Math.random() * 4)
          // answersArr.splice(randomNum, 0, correctAns)
          // return {
          //   id: nanoid(),
          //   question: quizQuestions,
          //   answers: answersArr,
          // }
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
            // incorrect_answers: shuffledAnswers,
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
  
  function selectAnswer(e, answerId) {
    console.log(e.target.id)
    console.log(answerId)
    if(e.target.id === answerId) {
      setQuestions(oldQuestions => {
        return oldQuestions.map(question => {
          return {
            ...question,
            answers: question.answers.map(answer => {
              if(answer.id === answerId) {
                return {...answer, isSelected: true}
              } else {return {...answer, isSelected: false}}
            })
          }
        })
      })
    }
    // setQuestions(oldQuestions => {
    //   return oldQuestions.map(question => {
    //     console.log(questionId)
    //     if(questions.id === questionId) {
    //       console.log("qorks")
    //       return {
    //         ...question,
    //         answers: question.answers.map( answer => {
    //           console.log(answer.id)
    //           if(answer.id === answerId) {
    //             console.log("selected")
    //             // return {...answer, isSelected: true}
    //           } else {
    //             return {...answer, isSelected: false}
    //           }
    //         })
    //       }
    //     } else {
    //       return question
    //     }
    //   })
    // })
    // questions.map(question => {
    //   if(question.correct_answer === e.target.textContent) {
    //     question.answers.map(answer => {
    //       if(answer.isCorrect) {
    //         re
    //       }
    //     })
    //   }
    // })
    
    
  }

  const questionText = questions.map((question) => {
    return (
      <Quiz
        selectAnswer={selectAnswer}
        key={question.id}
        questionText={decode(question.question)}
        quizQuestions={questions}
        answers={question.answers}
        questionId={question.id}
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
