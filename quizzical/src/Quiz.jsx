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
}

