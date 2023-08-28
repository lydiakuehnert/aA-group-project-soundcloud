import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteCommentThunk } from "../../store/comments";
import "./DeleteComment.css";
import { getSongThunk } from "../../store/songs";

export default function DeleteComment({ comment, songId }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();


    const handleDelete = async (e) => {
        e.preventDefault()
        await dispatch(deleteCommentThunk(comment.id))
        await dispatch(getSongThunk(songId))
        closeModal()
    }

    return (
        <div className="delete-modal">
            <h2>Confirm Delete</h2>
            <p>Do you really want to remove this comment?</p>
            <button onClick={handleDelete} className="yes-button">Yes (Delete Comment)</button>
            <button onClick={closeModal} className="no-button">Cancel (Keep Comment)</button>
        </div>
    )
}