import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useModal } from "../../context/Modal";
import { postImage } from "../../store/session";

export default function AddImageModal() {
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const [image, setImage] = useState("");
    const [errors, setErrors] = useState({});
    const [errorClass, setErrorClass] = useState("errors zero-opacity");
    const sessionUser = useSelector(state => state.session.user);

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
<<<<<<< HEAD
        
        const new_user = {
            // id: sessionUser.id,
            image: url,
            // username: sessionUser.username,
            // email: sessionUser.email,
            // firstname: sessionUser.firstname,
            // lastname: sessionUser.lastname,
            // password: sessionUser.password
        }
        if(!errors.url){
            dispatch(postImage(new_user))
=======
        const payload = {image: image}
        // const payload2 = JSON.stringify(payload)
        if(!errors.image){
            dispatch(postImage(payload))
>>>>>>> wed4
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