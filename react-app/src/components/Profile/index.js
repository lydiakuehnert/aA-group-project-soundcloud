// import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import OpenModalButton from "../OpenModalButton";
import AddImageModal from "../AddImageModal";


export default function Profile() {
    const dispatch = useDispatch()

    const user = useSelector(state => state.session.user);
    if (!user) return null;

    return (
        <div className='profile index'>
            <div>
            <OpenModalButton
                buttonText="+"
                modalComponent={<AddImageModal />} 
            />

                <img id='profile-image' src={user.image} alt={user.username}></img>
                <h1>{user.username}</h1>
            </div>
            <div>
                <h1>Tracks</h1>
                    {user.songs.map((song) => (
                        <div key={song.id} className='userSongs'>
                        <img className='track-image' src={user.image} alt={user.username}></img>
                        <p >{user.username}</p>
                        <p >{song.name}</p>
                        </div>
                        
                    ))}
                <div>
                <h1>{user.likes} Likes</h1>
                {user.likesList.map(like => (
                    <div> 
                        <img className='album-like' src={like.image} alt={like.user.username}></img>
                        <p>{like.name}</p>
                        <p>{like.user.username}</p>
                        <p>{like.audio}</p>
                    </div>
                ))}
                
                </div>
            </div>
        </div>
    )
}