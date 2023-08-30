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

        if (!name) validationErrors.name = 'Please provide a valid name'
        if (!image) validationErrors.image = 'Please provide a valid image'
        if (!audio) validationErrors.audio = 'Please provide valid audio'

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
            return
        }

        const formData = new FormData()
        formData.append("name",name)
        formData.append("user_id",user_id)
        formData.append("image",image)
        formData.append("audio",audio)


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
            <h1>still buggy</h1>
            <form className='upload-form' enctype="multipart/form-data" onSubmit={handleSubmit}>
                <div className='upload-div'>
                <section>
                    <div>
                    <label>
                        Name
                        <input
                            type='text'
                            placeholder='Name your track'
                            value={name}
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
                            accept='image/*'
                            onChange={(e) => setImage(e.target.files[0])}
                        />
                    </label>
                    </div>
                    {errors.image && <p>{errors.image}</p>}
                    <div>
                    <label>
                        Audio
                        <input
                            type='file'
                            accept='audio/*'
                            onChange={(e) => setAudio(e.target.files[0])}
                        />
                    </label>
                    </div>
                    {errors.audio && <p>{errors.audio}</p>}
                </section>
                <button type="submit" className='button-orange'>Create Song</button>
                </div>
                {(uploading)&& <p className='status-message'>Uploading...</p>}
            </form>
            </div>
        </div>
    )
}
