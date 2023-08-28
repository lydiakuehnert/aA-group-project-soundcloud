import React from "react";
import { useSelector } from 'react-redux';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import './Player.css';

function Player({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    return (
        <>
            {isLoaded && (
                <div className="player-background">
                    <AudioPlayer
                    autoPlay
                    src="http://example.com/audio.mp3"
                    onPlay={e => console.log("onPlay")}
                    // other props here
                    />
                </div>)
            }
        </>
    );
}

export default Player;