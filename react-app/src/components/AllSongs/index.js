import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSongsThunk } from "../../store/songs";
import SongCard from "../SongCard";
import "./AllSongs.css"

export default function AllSongs() {
    const dispatch = useDispatch();

    const songsObj = useSelector(state => state.songs.allSongs);
    const songs = Object.values(songsObj)
    const states = useSelector(state => state)
    console.log(states)

    useEffect(() => {
        dispatch(getSongsThunk())
    }, [dispatch])

    return (
        <>
            <div className="all-songs index">
                {songs.length > 0 && songs.map(song => (
                    <SongCard key={song.id} song={song} />
                ))}
            </div>
        </>
    )
}
