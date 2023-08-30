import { useDispatch } from "react-redux";
import { createCommentThunk } from "../../store/comments";
import { useModal } from "../../context/Modal";
import { useState } from "react";
import "./CommentPost.css";
import { getSongThunk } from "../../store/songs";

export default function CommentPost({ song }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [input, setInput] = useState("");
    const [errors, setErrors] = useState({})

    const songId = song.id;

    const handleSubmit = async (e) => {
        e.preventDefault()

        let validationErrors = {}

        if (!input) validationErrors.comment = 'Please provide a valid comment'

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
            return
        }

        const payload = {
            comment: input
        }

        try {
            await dispatch(createCommentThunk({ songId, payload }))
            dispatch(getSongThunk(songId))
            setInput("")
            setErrors({})
        } catch (error) {
            console.error('Error creating comment:', error)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="comment-form-box">
            <i class="fa-solid fa-cloud-bolt fa-2x"></i>
            {Object.values(errors).length > 0 && <p className="errors">{errors.comment}</p>}
            <input
                type="text"
                placeholder="Write a comment"
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit">Submit</button>
        </form>
    )
}