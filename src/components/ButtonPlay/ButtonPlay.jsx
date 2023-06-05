import React, {useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlay} from "@fortawesome/free-solid-svg-icons";
import VideoPlayer from "../VideoPlayer/VideoPlayer";
import "../VideoPlayer/_VideoPlayer.scss";

function ButtonPlay({trailer}) {
    const [playing, setPlaying] = useState(false);
    const openVideoPlayer = () => {
        setPlaying(true)
    }

    return (
        <>
            <button className={'button-play-video'} onClick={openVideoPlayer} type='button'>
                <FontAwesomeIcon icon={faPlay} className='play-icon'/>
                Trailer
            </button>
            {playing && (
                <VideoPlayer trailer={trailer} setPlaying={setPlaying}/>
            )}
        </>
    );
}

export default ButtonPlay;