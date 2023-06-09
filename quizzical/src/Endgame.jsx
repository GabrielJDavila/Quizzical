
export default function Endgame(props) {
    return (
        <div className="total-score-container">
            <h4 className="endgame-text">You scored {props.totalScore}/10 correct answers</h4>
            <button onClick={props.reloadGame} className="endgame-btn">Play again</button>
        </div>
    )
}