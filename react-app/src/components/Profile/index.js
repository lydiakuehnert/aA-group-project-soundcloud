// import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import OpenModalButton from "../OpenModalButton";
import AddImageModal from "../AddImageModal";
import "./Profile.css"
import noProfileImg from '../../images/blue-profile.jpeg';
import SongCard from "../SongCard";
import AudioPlayer from 'react-h5-audio-player';




export default function Profile() {
    const dispatch = useDispatch()

    const user = useSelector(state => state.session.user);
    if (!user) return null;

    return (
        <div className='profile index'>
            <div className='profile-header'>

                <img id='profile-image' src={user.image || noProfileImg} alt={user.username}></img>
                <OpenModalButton
                    buttonText="+"
                    modalComponent={<AddImageModal />} 
                />
                <h1>{user.username}</h1>
            </div>
            <div className='tracks-likes-div'>
            <div>
                <h1>Tracks</h1>
                    {user.songs.map((song) => (
                        // <div key={song.id} className='userSongs'>
                        // <img className='track-image' src={song.image} alt={user.username}></img>
                        // <p >{user.username}</p>
                        // <p >{song.name}</p>
                        // </div>

                        <SongCard key={song.id} song={song} />
                        
                    ))}
            </div>    
                <div>
                <h1>{user.likes} Likes</h1>
                {user.likesList.map(like => (
                    <div className='likes-list-div'> 
                        <img className='album-like' src={like.image} alt={like.user.username}></img>
                        <div>
                            <p>{like.name}</p>
                            <p>{like.user.username}</p>
                        </div>
                        <div>
                        <AudioPlayer
                    // autoPlay
                    src={like.audio}
                    />
                        </div>
                    </div>
                ))}
                
                </div>
            </div>
        </div>
    )
}