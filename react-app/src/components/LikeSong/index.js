import { useDispatch } from "react-redux"
import { createLikeThunk } from "../../store/songs"
import { useParams } from "react-router-dom"

export default function LikeSong() {
    const dispatch = useDispatch()
    const { songId } = useParams()
    const handleClick = async (e) => {
        e.preventDefault()
        await dispatch(createLikeThunk(songId))
    }
    return (
        <button onClick={handleClick}>Like Button</button>
    )
}
