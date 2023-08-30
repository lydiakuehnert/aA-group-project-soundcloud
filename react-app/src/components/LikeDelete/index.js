import { useDispatch } from "react-redux"
import { deleteLikeThunk } from "../../store/songs"
import { useParams } from "react-router-dom"

export default function LikeDelete() {
    const dispatch = useDispatch()
    const { songId } = useParams()
    const handleClick = async (e) => {
        e.preventDefault()
        await dispatch(deleteLikeThunk(songId))
    }
    return (
        <button onClick={handleClick}>Delete Button</button>
    )
}
