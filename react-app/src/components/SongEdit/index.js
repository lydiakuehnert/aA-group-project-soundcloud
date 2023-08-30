import { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import { editSongThunk } from '../../store/songs';
import { useModal } from '../../context/Modal';
import './SongEdit.css'

export default function SongEdit({ songId }) {
    const dispatch = useDispatch()
    const history = useHistory()
    const chosenSong = useSelector(state => Object.values(state.songs.allSongs)).filter(song => song.id === songId)[0];
    const user = useSelector(state => state.session.user)
    const user_id = user.id
    const [name, setName] = useState(chosenSong.name)
    const [image, setImage] = useState('')
    const [audio, setAudio] = useState('')
    const [errors, setErrors] = useState({})
    const {closeModal} = useModal()
    const [updating, setUpdating] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault()
        let validationErrors = {}

        if (!name) validationErrors.name = 'Please provide a valid name'
        if (!image) validationErrors.image = 'Please provide a valid image'
        if (!audio) validationErrors.audio = 'Please provide valid audio'

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
            return
        }
        const formData = new FormData()
        // formData.append("songId",songId)
        formData.append("user_id",user_id)
        formData.append("name",name)
        formData.append("audio",audio)
        formData.append("image",image)
        console.log("SONG.IMAGE WITHOUT IMAGE SET", formData.image)

        // const song = { songId, name, user_id, image, audio }
        // if(Object.values(errors).length > 0){
            try {
                setUpdating(true)
                await dispatch(editSongThunk(formData, songId))
                closeModal()
                history.push(`/songs/${songId}`)
            } catch (error) {
                console.error('Error creating spot:', error)
            }
        // }
    }


    return (
        <>
            <h1>still shitty</h1>
            <form onSubmit={handleSubmit}>
                <section>
                    <label>
                        Name
                        <input
                            type='text'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </label>
                    {errors.name && <p>{errors.name}</p>}
                    <label>
                        Image
                        <input
                            type='file'
                            accept='image/*'
                            id='image-btn'
                            onChange={(e) => setImage(e.target.files[0])}
                        />
                        <input
                        type="button"
                        id="new-image-btn"
                        value="Choose New File"
                        onClick={(e)=> document.getElementById('image-btn').click()} />
                    </label>
                    {errors.image && <p>{errors.image}</p>}
                    <label>
                        Audio
                        <input
                            type='file'
                            accept='audio/*'
                            id='audio-btn'
                            onChange={(e) => setAudio(e.target.files[0])}
                        />
                         <input
                        type="button"
                        id="new-audio-btn"
                        value="Choose New File"
                        onClick={(e)=> document.getElementById('audio-btn').click()} />
                    </label>
                    {errors.audio && <p>{errors.audio}</p>}
                </section>
                <button type="submit">Edit Song</button>
                {(updating)&& <p className='status-message'>Updating...</p>}
            </form>
        </>
    )
}
