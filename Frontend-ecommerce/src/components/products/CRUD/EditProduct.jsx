import {useContext,useEffect, useState  } from "react";
import { CategoryContext } from "../../../Context/categoryContext";
import { updateProduct } from "../../../services/products/productAPI";
import { validateProductForm } from "../../../utils/productValidation";
import ReactModal from "react-modal";
import './productcrud.css'

ReactModal.setAppElement("#root");

const ProductEditModal = ({ isOpen, onClose, product, onProductUpdated})=>{
    const [image, setImage] = useState(null);
    const [currentImageURL, setCurrentImageURL] = useState("");
    const { categories } = useContext(CategoryContext);
    const [isSuccess, setIsSuccess] = useState(false);
    const [messages, setMessages] = useState([]);

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        image: "",
        category_id:""
    });

    useEffect(() => {
        if (product) {
        setFormData({
        name: product.name || "",
        description: product.description || "",
        price: product.price || "",
        image: product.image  || "",
        category_id: product.category_id || "",
        });
        setCurrentImageURL(product.image);
        }
    }, [product]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
            }));
        };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { isValid, errorMessages } = validateProductForm(
            formData.name,
            formData.description,
            formData.price,
            formData.category_id
        );
        if (!isValid) {
            setMessages(errorMessages);
            return;
        }

        try {
        const formDataToSend = createFormData(formData, image);
        const response = await updateProduct(product.product_id, formDataToSend);
        if (response.status === 200) {
            setMessages(["Product updated successfully"]);
            setIsSuccess(true);
            setTimeout(() => {
                setMessages([]);
                setIsSuccess(false);
                onClose();
            }, 2000);
            onProductUpdated()
        } else {
            setMessages(["Failed to update product"]);
            setIsSuccess(false)
        }
        } catch (error) {
            setMessages(["Error updating product"]);
            setIsSuccess(false);
        }
    };

    const createFormData = (product, image) => {
        const formData = new FormData();
        formData.append('name', product.name);
        formData.append('description', product.description);
        formData.append('price', product.price);
        formData.append('category_id', parseInt(product.category_id));
        if (image) {
            formData.append('image', image);
        }
        return formData;
    };

    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Edit an item"
            className="modal-product"
            overlayClassName="modal-overlay"
            >
            <form  className="form"  onSubmit={handleSubmit}>
            <button className="modal__button-close" onClick={onClose}>×</button>
            <h3>EDIT AN ITEM</h3>
            <div className="modal__content">
            <div>
                <label htmlFor="name">Product Name</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Product Name"
                    required
                />
            </div>
            <div>
                <label htmlFor="description">Description</label>
                <input
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Product Description"
                    required
                />
            </div>
            <div>
                <label htmlFor="price">Price</label>
                <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="Product Price"
                    required
                />
            </div>
            <div>
                <label htmlFor="imagePath">Image</label>
                <input
                    type="file"
                    onChange={handleImageChange}
                    accept="image/*"
                />
                {currentImageURL && (
                    <div>
                    <img
                        src={currentImageURL}
                        alt="Current"
                        style={{ width: '100px', height: 'auto' }}
                    />
                    </div>
                )}
            </div>
            <div>
            <label htmlFor="category_id">Category</label>
            <select
                id="category_id"
                name="category_id"
                value={formData.category_id}
                onChange={(e) => setFormData(
                    { ...formData, category_id: e.target.value }
                )}
                required>
                <option value="">Select a category</option>
                {categories.map((category) => (
                    <option
                        key={category.category_id}
                        value={category.category_id}>
                        {category.name}
                    </option>
                ))}
            </select>
            </div>
                <button type="submit" className="btn-confirm">SAVE CHANGES</button>
            </div>
            <div className="form__error-messages">
            {messages.length > 0 && messages.map((msg, index) => (
            <p key={index} className={`p__message ${isSuccess ? "p__message-success" : "p__message-error"}`}>{msg}</p>
            ))}
        </div>
        </form>
        </ReactModal>
        );
    }

export default ProductEditModal;