import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteSongThunk } from "../../store/songs";
import { getSongThunk } from "../../store/songs";

export default function SongDelete({ songId }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleDelete = async (e) => {
        e.preventDefault()
        await dispatch(deleteSongThunk(songId))
        closeModal()
    }

    return (
        <div className="delete-modal">
            <h2>Confirm Delete</h2>
            <p>Do you really want to remove this song?</p>
            <button onClick={handleDelete} className="yes-button">Yes (Delete Song)</button>
            <button onClick={closeModal} className="no-button">Cancel (Keep Song)</button>
        </div>
    )
}
