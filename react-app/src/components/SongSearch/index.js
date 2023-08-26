import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSongsThunk } from "../../store/songs";
import SongCard from "../SongCard";
// import "./AllSongs.css"

export default function AllSongs() {
    const dispatch = useDispatch();

    const songs = useSelector(state => Object.values(state.songs.allSongs));

    useEffect(() => {
        dispatch(getSongsThunk())
    }, [dispatch])

    return (
        <div className="all-songs">
            {songs.length > 0 && songs.map(song => (
                <SongCard key={song.id} song={song} />
            ))}
        </div>
    )
}
