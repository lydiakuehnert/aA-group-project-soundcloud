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
    const sessionUser = useSelector(state => state.session.user);


    const handleEdit = async (e) => {
        e.preventDefault()
        const payload = {
            id: comment.id,
            comment: input, 
            song_Id: songId, 
            user_Id: sessionUser.id
        }
        await dispatch(editCommentThunk(payload))
        await dispatch(getSongThunk(songId))
        closeModal()
    }

    return (
        <div className="edit-modal">
            <h2>Edit Comment</h2>
            <input
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