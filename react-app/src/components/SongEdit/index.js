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
    const audioTypes = [".mp3", ".mp4", ".wav"]
    const imageTypes = [".pdf", ".png", ".jpeg", ".jpg", ".gif"];
    const handleSubmit = async (e) => {
        e.preventDefault()
        let validationErrors = {}

        if (!name) validationErrors.name = 'Please provide a valid name'
        if (!image) validationErrors.image = 'Please provide a valid image'
        if (!audio) validationErrors.audio = 'Please provide valid audio'

        if (audio && !(audioTypes.some(type => {
            return audio.name.endsWith(type)
        }))) {
            validationErrors.audio = 'Acceptable audio files must end in .mp3, .mp4, or .wav'
        }
        if (image && !(imageTypes.some(type => {
            return image.name.endsWith(type)
        }))) {
            validationErrors.audio = 'Acceptable image files must end in .pdf, .png, .jpg, .jpeg or .gif'
        }

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
    const handleAudio = async (e) => {
        e.preventDefault();
        const ogBtn = document.getElementById('audio-btn')
        ogBtn.click()
        const newBtn = document.getElementById('new-audio-btn')
        newBtn.style.display = 'none'
        ogBtn.style.display = 'revert'
    }

    const handleImage = async (e) => {
        e.preventDefault();
        const ogBtn = document.getElementById('image-btn')
        ogBtn.click()
        const newBtn = document.getElementById('new-image-btn')
        newBtn.style.display = 'none'
        ogBtn.style.display = 'revert'
    }

    return (
        <div className='song-edit-div'>
            <h1>Edit Song</h1>
            <form onSubmit={handleSubmit}>
                <section id='edit-song-data'>
                    <div>
                    <label>
                        Name
                        <input
                            type='text'
                            value={name}
                            maxLength='100'
                            onChange={(e) => setName(e.target.value)}
                        />
                    </label>
                    </div>
                    {errors.name && <p>{errors.name}</p>}

                    <div>
                    <label>
                        Image
                        <input
                            type='file'
                            // accept='image/*'
                            accept='.pdf, .png, .jpg, .jpeg, .gif'
                            id='image-btn'
                            onChange={(e) => setImage(e.target.files[0])}
                        />
                        <input
                        type="button"
                        id="new-image-btn"
                        value="Choose New File"
                        // onClick={(e)=> document.getElementById('image-btn').click()}
                        onClick={handleImage}
                        />
                    </label>
                    </div>
                    {errors.image && <p>{errors.image}</p>}

                    <div>
                    <label>
                        Audio
                        <input
                            type='file'
                            // accept='audio/*'
                            accept='.mp3, .mp4, .wav'
                            id='audio-btn'
                            onChange={(e) => setAudio(e.target.files[0])}
                        />
                         <input
                        type="button"
                        id="new-audio-btn"
                        value="Choose New File"
                        // onClick={(e)=> document.getElementById('audio-btn').click()}
                        onClick={handleAudio}
                        />
                    </label>
                    </div>
                    {errors.audio && <p>{errors.audio}</p>}
                </section>
                <div >
                <button className='button-center button-orange' type="submit">Edit Song</button>

                </div>
                {(updating)&& <p className='status-message'>Updating...</p>}
            </form>
        </div>
    )
}
