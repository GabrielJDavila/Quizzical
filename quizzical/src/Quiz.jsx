
export default function Quiz(props) {

    const selectedStyles = {
        backgroundColor: props.isSelected ? "blue" : ""
    }
    const questionId = props.questionId
    return (
        <div className="questions-container">
            <h3>{props.questionText}</h3>
            <div className="buttons-container">
                {props.answers.map(answer => {
                    return (
                        <button
                            key={answer.id}
                            className="question"
                            id={answer.id}
                            onClick={() => props.checkAnswer(questionId, answer.id)}
                        >
                            {answer.answerText}
                        </button>
                    )
                })}
                
            </div>
        </div>
    )
}

