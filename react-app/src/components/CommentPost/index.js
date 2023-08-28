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

        const payload = {
            comment: input
        }

        const result = await dispatch(createCommentThunk({ songId, payload }))
        
        if (result.errors) {
            setErrors(result)
        } else {
            dispatch(getSongThunk(songId))
            closeModal()
        }
    }

    return (
        <form onSubmit={handleSubmit} className="comment-form-box">
            <h2>Comment</h2>
            {Object.values(errors).length > 0 && <p className="errors">{errors.message}</p>}
            <textarea
                type="text"
                placeholder="Write a comment"
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit" disabled={input.length < 10}>Submit Your Comment</button>
        </form>
    )
}