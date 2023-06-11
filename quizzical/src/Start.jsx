
export default function Start(props) {
    return (
        <div>
            <h1 className="quiz-title">Quizzical</h1>
            <p className="quiz-description">A short quiz to test your video game knowledge</p>
            <button onClick={props.startQuiz} className="start">Start quiz</button>
        </div>
    )
}