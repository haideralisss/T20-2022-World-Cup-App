import React from 'react';
import { Player } from "@lottiefiles/react-lottie-player";
import cricketBowled from "../../../assets/images/animations/cricketBowled.json"; 

function LowerStatsCard(props) {
    return (
        <>
        <div class="coverInside">
            <p className='textInside'>{props.data}</p>
            <span className='coverInsideData'>
                            <img className='flagImg' src={props.flag} />
                            <h6>{props.teamName}</h6>
                        </span>
            <div class="coverOutside">
                <p>{props.title}</p>
                <span className='lottieAnimationSpan'>
                    <Player className='lottieAnimation' src={cricketBowled} 
                    loop autoplay />
                </span>
            </div>
        </div>
        </>
    );
}

export default LowerStatsCard;