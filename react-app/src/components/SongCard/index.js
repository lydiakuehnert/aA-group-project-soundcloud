import "./SongCard.css";
import { NavLink } from 'react-router-dom';

export default function SongCard({ song }) {

    if (!song) return null;

    return (
        <div title={song.name} className="song-card">
            <NavLink className="song-card-link" exact to={`/songs/${song.id}`}>
                <div>
                    <img src={song.image} alt="album of song"></img>
                </div>
                <div className="song-details">
                    <p className="song-track-name">{song.name}</p>
                    <p className="artist-name">{song.user.username}</p>
                </div>
            </NavLink>
        </div>
    )
}