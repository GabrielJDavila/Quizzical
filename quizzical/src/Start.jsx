
export default function Start(props) {
    return (
        <div>
            <h1>Quizzical</h1>
            <p>The ultimate quiz of the ages</p>
            <button onClick={props.startQuiz}>Start quiz</button>
        </div>
    )
}