import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSongThunk } from "../../store/songs";
import SongComments from "../SongComments";
import LikeSong from "../LikeSong";
import LikeDelete from "../LikeDelete";
import "./OneSong.css"
import { playerSongThunk } from "../../store/songs";

export default function OneSong() {
    const { songId } = useParams();

    const dispatch = useDispatch();

    const song = useSelector(state => state.songs.singleSong);
    const user = useSelector(state => state.session.user)
    const [songAudio, setSongAudio] = useState(song.audio)
    const [songClass, setSongClass] = useState('song-play-button hidden');
    const [liked, setLiked] = useState(false)
    const toggleLiked = () => {
        setLiked(!liked)
    }

    useEffect(() => {
        dispatch(getSongThunk(songId))
    }, [dispatch])

    useEffect(() => {
        if (song && user) {
            const findLike = user.likesList.find(likedSong => likedSong.id === song.id)
            setLiked(Boolean(findLike))
        }
    }, [song, user])
    
    useEffect(() => {
        if (song) {
            setSongAudio(song.audio)
        }
    }, [song])
    
    const hoverPlay = () => {
        setSongClass("song-play-button")
    }

    const sendAudio = () => {
        setSongAudio(song.audio)
        dispatch(playerSongThunk(songAudio))
    }


    const mouseLeave = () => setSongClass('song-play-button hidden')

    if (!song) return null;
    if (!song.id) return null;
    if (!user) return null
    if (!song.audio) return null;

    return (
        <div className="song-detail-page index">
            <div className="song-detail-box">
                <h1>{song.name}</h1>
                <div className="song-img-box" onMouseEnter={hoverPlay} onMouseLeave={mouseLeave}>
                    <img src={song.image}></img>
                    <div className={songClass} onClick={sendAudio}><i class="fa-regular fa-circle-play fa-4x"></i></div>
                </div>
                <div className="under-pics">
                    <div>
                        <h1>Artist: {song.user.username}</h1>
                        { liked ? <LikeDelete toggleLiked={toggleLiked}/> : <LikeSong toggleLiked={toggleLiked} /> }
                    </div>
                </div>
            </div>
            <div className="comment-detail-box">
                <SongComments song={song} />
            </div>
        </div>
    )
}
