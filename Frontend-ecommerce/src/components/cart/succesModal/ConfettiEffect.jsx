import ReactModal from "react-modal";
import { useContext, useEffect, useState  } from "react";
import { AuthContext } from '../../../Context/authContext';
import Confetti from 'react-confetti';
import { FaCheckCircle } from 'react-icons/fa';
import { useWindowSize } from 'react-use';
import './confetti.css'

ReactModal.setAppElement('#root');

function ConfettiEffect({ isOpen, onClose }) {
    const { user } = useContext(AuthContext)
    const username = user ? user.username : "Customer";
    const userEmail = user ? user.email : "";
    const [showConfetti, setShowConfetti] = useState(false);

    const { width, height } = useWindowSize();

    useEffect(() => {
        if (isOpen) {
            setShowConfetti(true);
        } else {
            setShowConfetti(false);
        }
    }, [isOpen]);

    return (
        <>
            {showConfetti && (
                <div className="confetti-container">
                    <Confetti
                        width={width}
                        height={height}
                        recycle={false}
                        numberOfPieces={500}
                    />
                </div>
            )}
            <ReactModal
                isOpen={isOpen}
                onRequestClose={onClose}
                contentLabel="Success Modal"
                className="succes-modal"
                overlayClassName="modalsucces-overlay"
            >
                <h2>Purchase Successful!</h2>
                <div className="success-icon">
                    <FaCheckCircle size={50} color="green" />
                </div>
                <p>
                    Hi <strong>{username}</strong>, your purchase has been completed successfully.
                    Thank you for shopping with us! A confirmation email has been sent to <strong>{userEmail}</strong>.
                </p>
                <button onClick={onClose}>Close</button>
            </ReactModal>
        </>
    );
}


export default ConfettiEffect;