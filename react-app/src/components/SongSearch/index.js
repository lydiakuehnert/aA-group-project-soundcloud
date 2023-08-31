import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getSearchedSongsThunk } from "../../store/songs";
import SongCard from "../SongCard";
import "./SongSearch.css"

export default function SongSearch() {
    const dispatch = useDispatch();
    const location = useLocation()
    const query = new URLSearchParams(location.search)
    const searched = query.get('')

    const songs = useSelector(state => Object.values(state.songs.allSongs));

    useEffect(() => {
        dispatch(getSearchedSongsThunk(searched))
    }, [dispatch, searched])

    return (
        <div className="all-songs index">
          {songs.length > 0 ? (
            songs.map((song) => <SongCard key={song.id} song={song} />
          )) : (
            <>
                <div className="no-songs-index">
                    <h1>NO SONGS FOUND</h1>
                    <div className="no-songs-subtext">
                        <p>Sorry, we didn't find any results for "{searched.toLowerCase()}".</p>
                        <p>Check the spelling, or try a different search.</p>
                    </div>
                </div>
            </>
          )}
        </div>
      );
}
