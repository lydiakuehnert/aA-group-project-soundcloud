import React from "react";
import { useSelector } from 'react-redux';
import { useState } from "react";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import './Player.css';

function Player({ isLoaded, song }) {
    const sessionUser = useSelector(state => state.session.user);
    // const [songAudio, setSongAudio] = useState(song);
    console.log("SONGAUDIO", song)

    return (
        <>
            {isLoaded && (
                <div className="player-background">
                    <AudioPlayer
                    autoPlay
                    src={song}
                    // src="https://soundcloudaudiofiles.s3.us-west-1.amazonaws.com/f66bebe9a94a4be89d84ea4e8099d094.mp3"
                    onPlay={e => console.log("onPlay")}
                    // other props here
                    />
                </div>)
            }
        </>
    );
}

export default Player;