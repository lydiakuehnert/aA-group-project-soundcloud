import React from "react";
import { useSelector } from 'react-redux';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import './Player.css';

function Player({ isLoaded }) {
    const playerSong = useSelector(state => state.songs.playerSong);
    console.log("SONGAUDIO", playerSong)

    return (
        <>
            {isLoaded && (
                <div className="player-background">
                    <AudioPlayer
                    autoPlay
                    src={playerSong}
                    volume='0.5'
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