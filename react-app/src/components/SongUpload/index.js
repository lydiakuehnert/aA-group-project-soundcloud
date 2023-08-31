import { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import { createSongThunk } from '../../store/songs';
import "./SongUpload.css"

export default function SongUpload() {
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(state => state.session.user)
    const user_id = user.id
    const [name, setName] = useState('')
    const [image, setImage] = useState('')
    const [audio, setAudio] = useState('')
    const [errors, setErrors] = useState({})
    const [uploading, setUploading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault()
        let validationErrors = {}
        const audioTypes = [".mp3", ".mp4", ".wav"]
        const imageTypes = [".pdf", ".png", ".jpeg", ".jpg", ".gif"];
        if (!name) validationErrors.name = 'Please provide a valid name'
        if (!image) validationErrors.image = 'Please provide a valid image'
        if (!audio) validationErrors.audio = 'Please provide valid audio'
        // console.log('AUDIO FROM AUDIO',audio)
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
        formData.append("name", name)
        formData.append("user_id", user_id)
        formData.append("image", image)
        formData.append("audio", audio)


        // const song = { name, user_id, image, audio }
        try {
            setUploading(true)
            const newSong = await dispatch(createSongThunk(formData, user))
            // console.log("NEWSONG FROM SONGUPLOAD",newSong)
            history.push(`/songs/${newSong?.newSong.id}`)
        } catch (error) {
            console.error('Error creating spot:', error)
        }
    }


    return (
        <div className='index'>
            <div className='song-upload-div'>
                <h1>Upload a Song</h1>
                <form className='upload-form' enctype="multipart/form-data" onSubmit={handleSubmit}>
                    <div className='upload-div'>
                        <section id='upload-form-data'>

                            <label className='upload-form-elements' >
                                Name:
                                <input
                                    className='song-inputs'
                                    type='text'
                                    placeholder='Name your track'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </label>

                            {errors.name && <p className='upload-validators'>{errors.name}</p>}

                            <label className='upload-form-elements' >
                                Image:
                                <input
                                    className='song-inputs'
                                    type='file'
                                    accept='image/*'
                                    onChange={(e) => setImage(e.target.files[0])}
                                />
                            </label>

                            {errors.image && <p className='upload-validators'>{errors.image}</p>}

                            <label className='upload-form-elements' >
                                Audio:
                                <input
                                    className='song-inputs'
                                    type='file'
                                    accept='audio/*'
                                    onChange={(e) => setAudio(e.target.files[0])}
                                />
                            </label>

                            {errors.audio && <p className='upload-validators'>{errors.audio}</p>}
                        </section>
                        <button id='upload-song-btn' type="submit" className='button-orange'>Create Song</button>
                    </div>
                    {(uploading) && <p className='status-message'>Uploading...</p>}
                </form>
                        <a id='free-link' href="https://pixabay.com/sound-effects/search/relax/?duration=0-30" target="_blank">Free Audio Files!</a>
            </div>
        </div>
    )
}
