import "./SongCard.css";
import { NavLink } from 'react-router-dom';
import { useState } from "react";


export default function SongCard({ song }) {
    const [songClass, setSongClass] = useState('song-play hidden');

    if (!song) return null;

    const hoverPlay = () => {
        setSongClass("song-play")
    }

    const mouseLeave = () => setSongClass('song-play hidden')

    return (
        //play button appears on hover
        //TODO: link song to play button and allow play on click
        <div title={song.name} className="song-card"
        onMouseEnter={hoverPlay}
        onMouseLeave={mouseLeave}
        >
            <NavLink className="song-card-link" exact to={`/songs/${song.id}`}>
                <div className="card-image">
                    <img src={song.image} alt="album of song"></img>

            <div className={songClass}><i class="fa-regular fa-circle-play fa-4x"></i></div>

                </div>

                <div className="song-details">
                    <p className="song-track-name">{song.name}</p>
                    <p className="artist-name">{song.user.username}</p>
                </div>
            </NavLink>
        </div>
    )
}