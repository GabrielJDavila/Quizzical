
export default function Quiz(props) {
    return (
        <div>
            <h3>{props.questionText}</h3>
            <div>
                <button>{props.correctAnswer}</button>
                <button>{props.incorrectAnswer1}</button>
                <button>{props.incorrectAnswer2}</button>
                <button>{props.incorrectAnswer3}</button>
            </div>
        </div>
    )
}