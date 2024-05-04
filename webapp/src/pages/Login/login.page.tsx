import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();

    const login = async (e: any) => {
        e.preventDefault();
        const userData = await axios.post("http://localhost:8000/api/v1/auth/login", {
            email: e.target[0].value,
            password: e.target[1].value,
        });

        localStorage.setItem("token", userData.data.token);
        navigate("/");
    };

    return (
        <div id="login-wrapper">
            <h1>Login</h1>
            <form onSubmit={(event) => login(event)}>
                <input type="email" placeholder="Email" />
                <input type="password" placeholder="Password" />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;