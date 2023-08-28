import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSongsThunk } from "../../store/songs";
import SongCard from "../SongCard";
import SongDelete from "../SongDelete";
import SongEdit from "../SongEdit";
import OpenModalButton from "../OpenModalButton";

export default function SongUser() {
    const dispatch = useDispatch();

    const songsObj = useSelector(state => state.songs.allSongs);
    const user = useSelector(state => state.session.user)
    const songs = Object.values(songsObj).filter(song => song.user.id === user.id)

    useEffect(() => {
        dispatch(getSongsThunk())
    }, [dispatch])

    return (
        <>
            <h2> ill clean up code tmrw </h2>
            <div className="all-songs index">
                {songs.length > 0 && songs.map(song => (
                    <>
                        <SongCard key={song.id} song={song} />
                        {user && user.id === song.user.id && <OpenModalButton
                            buttonText=<i class="fa-solid fa-trash"></i>
                            modalComponent={<SongDelete songId={song.id} />}
                        />}
                        {user && user.id === song.user.id && <OpenModalButton
                            buttonText=<i class=" fa-solid fa-pen-nib"></i>
                            modalComponent={<SongEdit songId={song.id} />}
                        />}
                    </>
                ))}
            </div>
        </>
    )
}
