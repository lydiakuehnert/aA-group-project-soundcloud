import { useDispatch } from "react-redux"
import { createLikeThunk } from "../../store/session"
import { useParams } from "react-router-dom"

export default function LikeSong({ toggleLiked }) {
    const dispatch = useDispatch()
    const { songId } = useParams()
    const handleClick = async (e) => {
        e.preventDefault()
        await dispatch(createLikeThunk(songId))
        toggleLiked()
    }
    return (
        <button onClick={handleClick} class="fa-solid fa-heart" />
    )
}
