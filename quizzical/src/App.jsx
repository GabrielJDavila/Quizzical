
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
  
  // function genNewBtn(isCorrect, answer) {
  //   return {
  //     answer: answer,
  //     isCorrect: isCorrect,
  //     isSelected: false,
  //     id: nanoid()
  //   }
  // }
  useEffect(() => {
    setLoading(true)
    fetch("https://opentdb.com/api.php?amount=10&category=15&difficulty=medium&type=multiplhttps://opentdb.com/api.php?amount=10&category=15&difficulty=easy&type=multiple")
      .then(res => res.json())
      .then(data => {
        setLoading(false)
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
    // setQuestions(oldQuestions => oldQuestions.map(question => {
    //   if(question.id === questionId) {
    //     return {
    //       ...question,
    //       answers: question.answers.map(answer => {
    //         if(answer.id === answerId) {
    //           console.log(`selected ${answerId}`)
    //           return {...answer, isSelected: true}
    //         } else {
    //           return {...answer, isSelected: false}
    //         }
    //       })
    //     }
    //   } else {
    //     return question
    //   }
    // }))
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
  // function selectAnswer(e, answerId) {
  //   setQuestions(oldQuestions => {
  //     let newScore = score; // Initialize the new score

  //     const newQuestions = oldQuestions.map(question => {
  //       if (question.id !== e.target.dataset.questionId) {
  //         // Preserve the isSelected state for other questions
  //         return question;
  //       }

  //       // Update the selected answer for the current question
        
  //       const updatedAnswers = question.answers.map(answer => {
  //           if (answer.id === answerId) {
  //             // Toggle the isSelected state for the selected answer
  //             let isSelected = !answer.isSelected

  //             // Update the score if the selected answer is correct
  //             if (isSelected && answer.isCorrect) {
  //               newScore++
  //             } else if (!isSelected && answer.isCorrect) {
  //               newScore--
  //             }

  //             return {...answer, isSelected}
  //           } else {
  //             return {...answer, isSelected: false}
  //           }
              
  //       })
        
  //     })

  //     setScore(newScore); // Update the score state
  //     return newQuestions; // Return the updated questions
  //   });
  // }

  // function selectAnswer(e, answerId) {
  //   if(e.target.id === answerId) {
  //     setQuestions(oldQuestions => {
  //       return oldQuestions.map(question => {
  //         if(question.id !== e.target.dataset.questionId) {
  //           return question
  //         }
  //         return {
  //           ...question,
  //           answers: question.answers.map(answer => {
  //             if(answer.id === answerId) {
  //               const isSelected = !answer.isSelected
  //               if(isSelected)
  //               setScore(prevScore => prevScore + 1)
  //               return {...answer, isSelected: !answer.isSelected}
  //             } else if(answer.isSelected) {
  //               return {...answer, isSelected: false}
  //             } else {
  //               return answer
  //             }
  //           })
  //         }
  //       })
  //     })
  //   }
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
    
    
  

  // const questionText = questions.map((question) => {
  //   return (
  //     <Quiz
  //       selectAnswer={selectAnswer}
  //       key={question.id}
  //       questionText={decode(question.question)}
  //       quizQuestions={questions}
  //       answers={question.answers}
  //       questionId={question.id}
  //     />
  //   )
  // })

  return (
    <div>
      <img
        src="./src/assets/blob1.png"
        alt="light blue blob"
        className="blue-blob"
      ></img>
      <img
        src="./src/assets/blob2.png"
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
