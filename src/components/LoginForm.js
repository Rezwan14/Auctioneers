import PropTypes from 'prop-types'

const LoginForm = ({ handleLogin, setUsername, setPassword, username, password, onLoginSuccess }) => {
  const handleLoginFormSubmit = async (event) => {
    event.preventDefault()
    await handleLogin(event)
    onLoginSuccess()
  };

  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLoginFormSubmit}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="loginbutton" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  onLoginSuccess: PropTypes.func.isRequired, 
};

export default LoginForm;
