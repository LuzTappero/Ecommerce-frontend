import { useContext, useState } from "react";
import { AuthContext } from "../../Context/authContext";
import { validateRegistration } from "../../utils/validateRegistration";
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import "./auth.css"

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate= useNavigate()

  const { login, register, errors, setErrors } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setErrors([])

    if(!isLogin){
      const validationErrors = validateRegistration(username, email, password)
      if(validationErrors.length >0){
        setErrors(validationErrors)
        return
      }
    }
    try {
      let response;
      if(isLogin){
        response = await login(email, password);
        if(response.message === "Login successful") {
          setMessage("Login successful");
          setEmail("");
          setPassword("");
          setTimeout(() => {
            navigate('/shop');
          }, 1500);
        } else {
          setMessage(response.message || "Login failed");
        }
      } else {
        response = await register(username, email, password);
        if (response.message === "Registration successful") {
          setMessage("Registration successful");
          setUsername("");
          setEmail("")
          setPassword("");
          setTimeout(() => {
            setIsLogin(true);
            setMessage("");
            setErrors([]);
          }, 1000);
        } else if (response.errors && Array.isArray(response.errors)) {
          setErrors(response.errors.map((error) => error.msg));
          setMessage("");
        } else {
          setMessage(response.message || "Registration failed");
        }
      }
    }catch (error) {
      if (errors.length === 0) {
        setMessage(error.response?.data?.message || "An unexpected error occurred");
      }
    }
  };

    const isSuccess = (message) => {
      return message.toLowerCase().includes("success");
    };

    const extractMessage = (error) => {
      return typeof error === 'object' && error.msg ? error.msg : error;
    };


  return (
    <section className="auth">
      <h1 className="auth__title">
        <FontAwesomeIcon className="auth__icon" icon={faUser}/>
        {isLogin ? "LOGIN AND START SHOPPING !" : "REGISTER AND JOIN US !"}
      </h1>
      <form className="auth__form" onSubmit={handleSubmit}>
        <div className="auth__form-item">
          <label htmlFor="email">E-mail</label>
          <input
            type="text"
            id="email"
            name="email"
            required
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        {!isLogin && (
          <div className="auth__form-item">
            <label htmlFor="email">Username</label>
            <input
              type="username"
              id="username"
              name="username"
              required
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
          </div>
        )}
        <div className="auth__form-item">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <button type="submit">
          {isLogin ? "LOGIN" : "REGISTER"}
        </button>

        {typeof message === "string" && message && (
          <p className={isSuccess(message) ? "auth__message auth__message--success" : "auth__message auth__message--error"}>
            {message}
          </p>
        )}

        {Array.isArray(message) && message.length > 0 && (
            <ul className={isSuccess(message[0]) ?  "auth__message-list auth__message-list--success" : "auth__message-list auth__message-list--error"}>
              {message.map((msg, index) => (
                <li key={index} className={isSuccess(msg) ?  "auth__message-item auth__message-item--success" : "auth__message-item auth__message-item--error"}>
                  {extractMessage(msg)}
                  </li>
              ))}
            </ul>
          )}

        {errors.length > 0 && (
          <ul className="auth__message-list auth__message-list--error">
            {errors.map((error, index) => (
              <li key={index} className="auth__message-item auth__message-item--error">
                {extractMessage(error)}
              </li>
            ))}
          </ul>
        )}
        <div className="auth__go-to-register">
          <h2 className="auth__subtitle">
            {isLogin
              ? "NOT A MEMBER? JOIN US HERE!"
              : "ALREADY A MEMBER? LOGIN HERE!"}
          </h2>
          <button
            type="button"
            onClick={() => {setIsLogin(!isLogin)
              setMessage("");
              setErrors([]);
            }}
          >
            {isLogin ? "Register" : "Login"}
          </button>
        </div>
      </form>
    </section>
  );
}


export default Auth;
