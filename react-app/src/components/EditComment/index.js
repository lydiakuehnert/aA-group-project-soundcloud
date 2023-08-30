import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { editCommentThunk } from "../../store/comments";
import "./EditComment.css";
import { getSongThunk } from "../../store/songs";
import { useState } from "react";

export default function EditComment({ comment, songId }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [input, setInput] = useState(comment.comment);
    const [errors, setErrors] = useState({})
    const sessionUser = useSelector(state => state.session.user);


    const handleEdit = async (e) => {
        e.preventDefault()
        let validationErrors = {}

        if (input.length < 1) validationErrors.comment = 'Please provide a valid comment'

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
            return
        }

        const payload = {
            id: comment.id,
            comment: input, 
            song_Id: songId, 
            user_Id: sessionUser.id
        }
        try {
            await dispatch(editCommentThunk(payload))
            await dispatch(getSongThunk(songId))
            dispatch(getSongThunk(songId))
            setErrors({})
            closeModal()
        } catch (error) {
            console.error('Error editing comment:', error)
        }
    }

    return (
        <div className="edit-modal">
            <h2>Edit Comment</h2>
            {Object.values(errors).length > 0 && <p className="errors">{errors.comment}</p>}
            <textarea
                type="text"
                placeholder="Write a comment"
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={handleEdit} className="edit-button">Edit Comment</button>
            <button onClick={closeModal} className="cancel-button">Cancel</button>
        </div>
    )
}