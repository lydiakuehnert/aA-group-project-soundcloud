import "./SongCard.css";
import { NavLink } from 'react-router-dom';

export default function SongCard({ song }) {

    if (!song) return null;

    return (
        <div title={song.name} className="song-card">
            <NavLink className="song-card-link" exact to={`/songs/${song.id}`}>
                <div>
                    <img src={song.image} alt="song image"></img>
                </div>
                <div className="song-details">
                    <h3 className="song-track-name">{song.name}</h3>
                    <h3 className="artist-name">{song.user.username}</h3>
                </div>
            </NavLink>
        </div>
    )
}