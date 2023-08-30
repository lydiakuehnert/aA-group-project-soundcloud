// import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import OpenModalButton from "../OpenModalButton";
import AddImageModal from "../AddImageModal";
import "./Profile.css"
import noProfileImg from '../../images/blue-profile.jpeg';
// import SongCard from "../SongCard";
// import AudioPlayer from 'react-h5-audio-player';
import { Link } from 'react-router-dom';



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
				<Link className='link1' exact to={`/uploads`}><h1 className='profile-h1'>Tracks</h1></Link>

                
                    {/* {user.songs.map((song) => (
                        <SongCard key={song.id} song={song} />                  
                    ))} */}
            </div>    
                <div>
              <Link className='link1' exact to={`/likes`}>
                <h1 className='profile-h1'><i class="fa-solid fa-heart"></i> {user.likes} Likes</h1>
              </Link>

                
{/*                 
                {user.likesList.map(like => (
                    <div className='likes-list-div'> 
                        <img className='album-like' src={like.image} alt={like.user.username}></img>
                        <div>
                            <p>{like.name}</p>
                            <p>{like.user.username}</p>
                        </div>
                        
                    </div>
                ))} */}
                
                </div>
            </div>
        </div>
    )
}