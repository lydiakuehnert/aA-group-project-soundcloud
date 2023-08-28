import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getSearchedSongsThunk } from "../../store/songs";
import SongCard from "../SongCard";
// import "./AllSongs.css"

export default function SongSearch() {
    const dispatch = useDispatch();
    const location = useLocation()
    const query = new URLSearchParams(location.search)
    const searched = query.get('')
    console.log("@@@@HEHEHEHEHHEHEHEHEHEHEH@@@@@")
    console.log(searched)

    const songs = useSelector(state => Object.values(state.songs.allSongs));
    console.log(songs)

    useEffect(() => {
        dispatch(getSearchedSongsThunk(searched))
    }, [dispatch, searched])

    return (
        <div className="all-songs">
            {songs.length > 0 && songs.map(song => (
                <SongCard key={song.id} song={song} />
            ))}
        </div>
    )
}
