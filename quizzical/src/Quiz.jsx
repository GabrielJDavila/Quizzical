
export default function Quiz(props) {
    return (
        <div className="questions-container">
            <h3>{props.questionText}</h3>
            <div className="buttons-container">
                <button className="question">{props.correctAnswer}</button>
                <button className="question">{props.incorrectAnswer1}</button>
                <button className="question">{props.incorrectAnswer2}</button>
                <button className="question">{props.incorrectAnswer3}</button>
            </div>
        </div>
    )
}