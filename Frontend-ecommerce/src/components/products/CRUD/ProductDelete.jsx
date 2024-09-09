/* eslint-disable no-unused-vars */
import { useState, useEffect} from "react";
import { useProducts } from "../../../Context/productContext";
import ReactModal from "react-modal";
import './productcrud.css'

ReactModal.setAppElement("#root");

function ProductDeleteModal({ isOpen, closeModal, productId, onDelete }) {
    const [isSuccess, setIsSuccess] = useState(false);
    const [messages, setMessages] = useState([])
    const { deleteProd } = useProducts();

    useEffect(() => {
        if (!isOpen) {
            setMessages([]);
            setIsSuccess(false);
        }
    }, [isOpen]);

    const handleDelete = async (e)=>{
        e.preventDefault()

    try{
    const response = await deleteProd(productId)
        if (response.success) {
            setMessages([response.message]);
            setIsSuccess(true)
            if (onDelete) onDelete();
            setTimeout(closeModal, 1500)
        }else {
            setMessages([response.message]);
            setIsSuccess(false);
        }
    } catch (error) {
        const errorMessage = error.response?.data?.message || "An unexpected error occurred";
        setMessages([errorMessage]);
        setIsSuccess(false);
    }
};

return (
    <ReactModal
    isOpen={isOpen}
    onRequestClose={closeModal}
    className="modal-delete"
    overlayClassName="modal-delete-overlay"
>
    <button className="btn-close" onClick={closeModal}> × </button>
    <div className="modal__content-delete">
        <h3>Are you sure you want to delete this item from the database?</h3>
        <button className="btn-confirm" onClick={handleDelete}>Delete</button>
        <button className="btn-cancel" onClick={closeModal}>Cancel</button>
    <div className="form__error-messages">
        {Array.isArray(messages) &&
        messages.length > 0 &&
        messages.map((msg, index) => (
            <p
            key={index}
            className={`p__message ${
                isSuccess ? "p__message-success" : "p__message-error"
            }`}
            >
            {msg}
            </p>
        ))}
    </div>
    </div>
</ReactModal>
);
}

export default ProductDeleteModal


