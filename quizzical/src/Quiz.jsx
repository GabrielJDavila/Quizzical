import { decode } from 'html-entities'
import { nanoid } from 'nanoid'

export default function Quiz(props) {
    const questions = props.quizQuestions.map((question, index) => {
        const displayQuestion = 
            <h4
                key={question.id}
                className="question-title"
            >
                {decode(question.question)}
            </h4>
        const displayAnswers = question.answers.map(answer => {

            function styles() {
                if(answer.isSelected) {
                    return {
                        backgroundColor: "#D6DBF5",
                        border: "none",
                        scale: ".95",
                        fontWeight: "bold"
                    }
                // } else if(props.checked && answer.isSelected && answer.isCorrect){
                //     return {backgroundColor: "#94D7A2"}
                } else if(props.checked && !answer.isSelected && answer.isCorrect) {
                    return {backgroundColor: "#F8BCBC", fontWeight: "bold"}
                }
            }

            return (
                <button
                    key={answer.id}
                    className="answer"
                    style={styles()}
                    onClick={() => props.selectButton(question.id, answer.id)}
                >
                    {answer.answerText}
                </button>
            )
        })
        return (
            <div key={nanoid()} className="questions-container">
                {displayQuestion}
                <div key={nanoid()} className="buttons-container">
                    {displayAnswers}
                </div>
            </div>
        )
    })
    return (
        <div>
            {questions}
        </div>
    )
    // function styles(answer) {
    //     if(answer.isSelected) {
    //         return {backgroundColor: "#94D7A2"}
    //     } else if(!answer.isSelected && answer.isCorrect) {
    //         return {backgroundColor: "#F8BCBC"}
    //     }
    // }

    // const questions = props.questions.map(question => {
    //     const displayQuestion =
    //         <h3
    //             key={question.id}
    //             className=""
    //         >
    //             {decode(question.question)}
    //         </h3>

    //     const displayAnswers = question.answers.map(answer => {
    //         return (
    //             <button
    //                 key={answer.id}
    //                 className="answer"
    //                 // style={styles(answer)}
    //                 onClick={() => props.selectAnswer(question.id, answer.id)}
    //             >
    //                 {answer.answerText}
    //             </button>
    //         )
    //     })
    //     return (
    //         <div key={nanoid()} className="questions-container">
    //             {displayQuestion}
    //             <div key={nanoid()} className="buttons-container">
    //                 {displayAnswers}
    //             </div>
    //         </div>
    //     )
    // })

    // const questionId = props.quizQuestions.map(question => {
    //     return question.id
    // })
    
    // return (
    //     // <div>
    //     //     {questions}
    //     // </div>
    //     <div className="questions-container">
    //         <h3>{props.questionText}</h3>
    //         <div className="buttons-container">
    //             {props.answers.map(answer => {
    //                 const styles = {
    //                     backgroundColor: answer.isSelected ? "blue" : ""
    //                 }
    //                 return (
    //                     <button
    //                         key={answer.id}
    //                         className="question"
    //                         id={answer.id}
    //                         data-question-id={props.questionId}
    //                         style={styles}
    //                         onClick={(e) => props.selectAnswer(e, answer.id)}
    //                         disabled={answer.isSelected}
    //                     >
    //                         {answer.answerText}
    //                     </button>
    //                 )
    //             })}
                
    //         </div>
    //     </div>
    // )
}

