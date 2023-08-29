import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLikedSongsThunk } from "../../store/songs";
import SongCard from "../SongCard";
import "./LikedSongs.css"

export default function LikedSongs() {
    const dispatch = useDispatch();

    const songsObj = useSelector(state => state.songs.allSongs);
    const songs = Object.values(songsObj)
    console.log('hi')
    console.log(songs)

    useEffect(() => {
        dispatch(getLikedSongsThunk())
    }, [dispatch])

    return (
        <div className="all-songs index">
            {songs.length > 0 && songs.map(song => (
                <SongCard key={song.id} song={song} />
            ))}
        </div>
    )
}
