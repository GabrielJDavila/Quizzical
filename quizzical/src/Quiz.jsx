
export default function Quiz(props) {
    return (
        <div className="questions-container">
            <h3>{props.questionText}</h3>
            <div className="buttons-container">
                <button onClick={props.checkAnswer} className="question">{props.incorrectAnswer1}</button>
                <button onClick={props.checkAnswer} className="question">{props.incorrectAnswer2}</button>
                <button onClick={props.checkAnswer} className="question">{props.incorrectAnswer3}</button>
                <button onClick={props.checkAnswer} className="question">{props.incorrectAnswer4}</button>
            </div>
        </div>
    )
}