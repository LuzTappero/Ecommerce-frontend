import {useContext, useState, useRef  } from "react";
import { CategoryContext } from "../../../Context/categoryContext";
import { createProduct } from "../../../services/products/productAPI";
import { validateProductForm } from "../../../utils/productValidation";
import ReactModal from "react-modal";
import './productcrud.css'

ReactModal.setAppElement("#root");

const ProductCreateModal = ({ isOpen, onClose, onProductCreated})=>{
    const { categories } = useContext(CategoryContext);
    const [messages, setMessages] = useState([]);
    const [name, setName] = useState('')
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);
    const [category_id, setCategory_id] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    const fileInputRef = useRef(null);

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const createFormData = (product, image)=>{
        const formData= new FormData();
        formData.append('name', product.name)
        formData.append('description', product.description)
        formData.append('price', product.price)
        formData.append('category_id', parseInt(product.category_id));
        if (image) {
            formData.append('image', image);
        }
        return formData;
    }

    const handleSaveProduct = async (e) => {
        e.preventDefault()

        const { isValid, errorMessages } = validateProductForm(name, description, price, category_id);
        if (!isValid) {
            setMessages(errorMessages);
            return;
        }

        const newProduct = {
            name: name,
            description: description,
            price: price,
            category_id: category_id, };

        const formData = createFormData(newProduct, image);

    try{
        const response = await createProduct(formData)
        if (response.status === 201) {
            setIsSuccess(true);
            setMessages(["Product saved successfully"]);
            setName('')
            setDescription('')
            setPrice('')
            setCategory_id('')
            setImage(null)

            if (fileInputRef.current) {
                fileInputRef.current.value = null;
            }

            onProductCreated()
            setTimeout(() => {
                setMessages([]);
            }, 1500);
        } else {
            setMessages(["Error uploading product"]);
            setIsSuccess(false);
        }
    } catch (error) {
        setIsSuccess(false);
        if (error.response && error.response.data && error.response.data.errors) {
            const messages = error.response.data.errors.map((err) => err.msg);
            setMessages(messages);
        } else {
            setMessages(["An unexpected error occurred"]);
        }
    }
}

return(
    <ReactModal
    isOpen={isOpen}
    onRequestClose={onClose}
    contentLabel="Add New Product"
    className="modal-product"
    overlayClassName="modal-overlay"
>

    <form className="form" onSubmit={handleSaveProduct}>
        <button onClick={onClose} className="modal__button-close">×</button>
        <h3>ADD A NEW PRODUCT</h3>
        <div className="modal__content">
            <div>
                <label htmlFor="name">Product Name</label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required />
            </div>
        <div>
            <label htmlFor="description">Description</label>
            <input
                id="description"
                name="description"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required maxLength="1000" />
        </div>
        <div>
            <label htmlFor="price">Price</label>
            <input
                id="price"
                name="price"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                step="0.01" />
        </div>
        <div>
            <label htmlFor="imagePath">Image</label>
            <input
                id="imagePath"
                name="imagePath"
                type="file"
                onChange={handleImageChange}
                ref={fileInputRef} />
        </div>
        <div>
            <label htmlFor="category_id">Category</label>
                <select
                id="category_id"
                name="category_id" value={category_id} onChange={(e) => setCategory_id(e.target.value)} required>
                <option value="">Select a category</option>
                {categories.map((category) => (
                    <option key={category.category_id} value={category.category_id}>{category.name}</option>
                ))}
                </select>
        </div>
        <button onClick={handleSaveProduct} type="submit">SAVE</button>
        <div className="form__error-messages">
            {messages.length > 0 && messages.map((msg, index) => (
            <p key={index} className={`p__message ${isSuccess ? "p__message-success" : "p__message-error"}`}>{msg}</p>
            ))}
        </div>
    </div>
    </form>
    </ReactModal>
    )
}

export default ProductCreateModal



