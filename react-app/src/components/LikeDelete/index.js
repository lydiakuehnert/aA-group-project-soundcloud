import { useDispatch } from "react-redux"
import { deleteLikeThunk } from "../../store/songs"
import { useParams } from "react-router-dom"

export default function LikeDelete({ toggleLiked }) {
    const dispatch = useDispatch()
    const { songId } = useParams()
    const handleClick = async (e) => {
        e.preventDefault()
        await dispatch(deleteLikeThunk(songId))
        toggleLiked()
    }
    return (
        <button onClick={handleClick} class="fa-solid fa-heart-broken" />
    )
}
