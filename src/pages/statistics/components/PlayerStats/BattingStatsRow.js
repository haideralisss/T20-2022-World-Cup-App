import React from "react";

function BattingStatsRow (props) {
    return (
        <>
        <div className="playerStatistic">
                    <div>
                        <p className="statsType">Batting <span className="pink-text">Stats</span></p>
                    </div>
                    <div className="statPair">
                        <p className="statsLabel">
                            Innings
                        </p>
                        <p className="statsItself">
                            {props.innings}
                        </p>
                    </div>
                    <div className="statPair">
                        <p className="statsLabel">
                            Runs
                        </p>
                        <p className="statsItself">
                            {props.runs}
                        </p>
                    </div>
                    <div className="statPair">
                        <p className="statsLabel">
                            Balls
                        </p>
                        <p className="statsItself">
                            {props.balls}
                        </p>
                    </div>
                    <div className="statPair">
                        <p className="statsLabel">
                            4s
                        </p>
                        <p className="statsItself">
                            {props.fours}
                        </p>
                    </div>
                    <div className="statPair">
                        <p className="statsLabel">
                            6s
                        </p>
                        <p className="statsItself">
                            {props.sixes}
                        </p>
                    </div>
                    <div className="statPair">
                        <p className="statsLabel">
                            Average
                        </p>
                        <p className="statsItself">
                            {props.average}
                        </p>
                    </div>
                    <div className="statPair">
                        <p className="statsLabel">
                            Strike Rate
                        </p>
                        <p className="statsItself">
                            {props.strikeRate}
                        </p>
                    </div>
                    <div className="statPair">
                        <p className="statsLabel">
                            50s
                        </p>
                        <p className="statsItself">
                            {props.fifties}
                        </p>
                    </div>
                    <div className="statPair">
                        <p className="statsLabel">
                            100s
                        </p>
                        <p className="statsItself">
                            {props.hundreds}
                        </p>
                    </div>
                    <div className="statPair">
                        <p className="statsLabel">
                            Highest Score
                        </p>
                        <p className="statsItself">
                            {props.highestScore}
                        </p>
                    </div>
                    <div className="statPair">
                        <p className="statsLabel">
                            Not Out
                        </p>
                        <p className="statsItself">
                            {props.notOut}
                        </p>
                    </div>
                    <div className="statPair">
                        <p className="statsLabel">
                            LBW
                        </p>
                        <p className="statsItself">
                            {props.Lbw}
                        </p>
                    </div>
                    <div className="statPair">
                        <p className="statsLabel">
                            Bowled
                        </p>
                        <p className="statsItself">
                            {props.bowled}
                        </p>
                    </div>
                    <div className="statPair">
                        <p className="statsLabel">
                            Stumped
                        </p>
                        <p className="statsItself">
                            {props.stumped}
                        </p>
                    </div>
                    <div className="statPair">
                        <p className="statsLabel">
                            Caught Out
                        </p>
                        <p className="statsItself">
                        {props.caughtOut}
                        </p>
                    </div>
                    <div className="statPair">
                        <p className="statsLabel">
                            Run Out
                        </p>
                        <p className="statsItself">
                            {props.runOut}
                        </p>
                    </div>
                </div>
        </>
    )
}

export default BattingStatsRow;