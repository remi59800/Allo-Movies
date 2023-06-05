import React from 'react';
import Youtube from "react-youtube";

function VideoPlayer({trailer, setPlaying}) {

    const closeVideoPlayer = () => {
        setPlaying(false);
    }

    return (
        <div className='youtube-container'>
            <Youtube
                videoId={trailer.key}
                className={'youtube'}
                opts={{
                    width: '100%', height: '540px', playerVars: {
                        autoplay: 1, controls: 1,
                    },
                }}
            />
            <div
                className='close-container'
                onClick={closeVideoPlayer}
            >
                <div className='leftright'></div>
                <div className='rightleft'></div>
            </div>
        </div>
    );
}

export default VideoPlayer;