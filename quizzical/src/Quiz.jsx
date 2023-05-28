
export default function Quiz(props) {

    const selectedStyles = {
        backgroundColor: props.isSelected ? "blue" : ""
    }

    return (
        <div className="questions-container">
            <h3>{props.questionText}</h3>
            <div className="buttons-container">
                {props.answers.map((answer, index) => {
                    return (
                        <button
                            key={index}
                            className="question"
                            onClick={(e) => props.checkAnswer(e, index)}
                        >
                            {answer.answerText}
                        </button>
                    )
                })}
                {/* <button onClick={props.checkAnswer} style={selectedStyles} className="question">{props.incorrectAnswer1}</button>
                <button onClick={props.checkAnswer} style={selectedStyles} className="question">{props.incorrectAnswer2}</button>
                <button onClick={props.checkAnswer} style={selectedStyles} className="question">{props.incorrectAnswer3}</button>
                <button onClick={props.checkAnswer} style={selectedStyles} className="question">{props.incorrectAnswer4}</button> */}
            </div>
        </div>
    )
}
// export default function Quiz({ questionIndex, questionText, answers, checkAnswer }) {
//     return (
//       <div>
//         <h2>{questionText}</h2>
//         {answers.map((answer, answerIndex) => (
//           <button
//             key={answerIndex}
//             className={answer.isSelected ? "selected-answer" : ""}
//             onClick={() => checkAnswer({ questionIndex, answerIndex })}
//           >
//             {answer.answerText}
//           </button>
//         ))}
//       </div>
//     );
