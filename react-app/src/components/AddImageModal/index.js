import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useModal } from "../../context/Modal";
import { postImage } from "../../store/session";
import './AddImageModal.css';


export default function AddImageModal() {
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const [image, setImage] = useState("");
    const [errors, setErrors] = useState({});
    const [errorClass, setErrorClass] = useState("errors hidden");


    useEffect(()=> {
        const errorObj = {};
        const fileTypes = ['.jpeg', '.png', '.jpg'];
        if (!(fileTypes.some(type => {
            return image.endsWith(type)}))) {
            errorObj['image'] = 'Image URL must end in .png, .jpg, or .jpeg';
        } if (!image) errorObj['image'] = 'Please set an image or click cancel';
        setErrors(errorObj);
    }, [image])

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrorClass('errors')
        const payload = {image: image}
        if(!errors.image){
            dispatch(postImage(payload))
            closeModal()
        }
    }

    return (
        <div className="prof-img-div">
        <input type='url' className='txtInput'
                name='profile-image'
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder='Image URL'
                size='30' />
        <div className="add-image-errors">
        <p className={errorClass}>{errors.image}</p>
        </div>
        <div>
            <button className='button-orange' onClick={handleSubmit}>Add Image</button>
            <p className='cancel-click' onClick={closeModal}>Cancel</p>
        </div>
        </div>
    )

}