import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();

    const register = async (e: any) => {
        e.preventDefault();
        await axios.post("http://localhost:8000/api/v1/auth/register", {
            firstname: e.target[0].value,
            surname: e.target[1].value,
            email: e.target[2].value,
            password: e.target[3].value
        })
        navigate("/login");
    }

    return (
        <div id="register-wrapper">
            <h1>Register</h1>
            <form onSubmit={(event) => register(event)}>
                <input type="text" placeholder="Firstname" />
                <input type="text" placeholder="Surname" />
                <input type="email" placeholder="Email" />
                <input type="password" placeholder="Password" />
                <button type="submit">Register</button>
            </form>
        </div>
    );
}
 
export default Register;