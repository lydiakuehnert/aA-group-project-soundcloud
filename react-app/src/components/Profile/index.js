import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";


export default function Profile() {
    const dispatch = useDispatch()

    const user = useSelector(state => state.session.user);
    if (!user) return null;

    return (
        <div className='profile index'>
            <div>
            {/* <img id='profile-image' src={image.url} alt={user.username}></img> */}
            <p>{user.username}</p>
            </div>
            <div>
                {/* change p to tabs */}
                <p>Tracks</p>
                <p>Likes</p>
            </div>
        </div>
    )
}