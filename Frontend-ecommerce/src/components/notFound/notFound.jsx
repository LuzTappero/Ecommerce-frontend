import './notFound.css';

const NotFound = () => {
    return (
        <div className="content">
            <h1>404</h1>
            <p>Page Not Found</p>
        <a href="/" className="btn-back-home">Back to Home</a>
        </div>
    );
};

export default NotFound;