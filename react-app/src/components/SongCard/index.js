import "./SongCard.css";
import { NavLink } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { useState } from "react";
import { playerSongThunk } from "../../store/songs";


export default function SongCard({ song }) {
    const dispatch = useDispatch();
    const [songClass, setSongClass] = useState('song-play hidden');
    const [songAudio, setSongAudio] = useState(song.audio)

    if (!song) return null;

    const hoverPlay = () => {
        setSongClass("song-play")
    }

    const sendAudio = () => {
        setSongAudio(song.audio)
        dispatch(playerSongThunk(songAudio))
    }


    const mouseLeave = () => setSongClass('song-play hidden')

    return (
        //play button appears on hover
        <div title={song.name} className="song-card"
        onMouseEnter={hoverPlay}
        onMouseLeave={mouseLeave}
        >

                <div className="card-image">
                <NavLink className="song-card-link" exact to={`/songs/${song.id}`}>

                    <img src={song.image} alt="album of song"></img>
                </NavLink>


            <div className={songClass} onClick={sendAudio}><i className="fa-regular fa-circle-play fa-4x"></i></div>

                </div>
            <NavLink className="song-card-link" exact to={`/songs/${song.id}`}>

                <div className="song-details">
                    <p className="song-track-name">{song.name}</p>
                    <p className="artist-name">{song.user.username}</p>
                </div>
            </NavLink>
        </div>
    )
}
