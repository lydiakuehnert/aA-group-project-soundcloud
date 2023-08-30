import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useModal } from "../../context/Modal";
import { postImage } from "../../store/session";

export default function AddImageModal() {
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const [image, setImage] = useState("");
    const [errors, setErrors] = useState({});
    const [errorClass, setErrorClass] = useState("errors zero-opacity");


    useEffect(()=> {
        const errorObj = {};
        const fileTypes = ['.jpeg', '.png', '.jpg'];
        if (!(fileTypes.some(type => {
            return image.endsWith(type)}))) {
            errorObj['image'] = 'Image URL must end in .png, .jpg, or .jpeg';
        } if (!image) errorObj['image'] = 'Please set an image or click cancel';
        setErrors(errorObj);
    }, [image])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorClass('errors')
        const payload = {image: image}
        if(!errors.image){
            dispatch(postImage(payload))
            closeModal()
        }
        
    }

    return (
        <div>
        <input type='url' className='txtInput'
                name='profile-image'
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder='Image URL'
                size='30' />
        <p className={errorClass}>{errors.image}</p>
        <button onClick={handleSubmit}>Add Image</button>
        <button onClick={closeModal}>Cancel</button>
        </div>
    )

}