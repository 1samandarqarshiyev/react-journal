import Form from "./Form";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
	const { register } = useAuth();
	const { navigate } = useNavigate();


	const onSubmit = async (data) => {
		console.log(data);
		register(data.email, data.password)
			.then((data) => {
				console.log(data);
				navigate("/")
			})
			.catch((error) => {
				console.log(error);
			})
	}

	return (
		<Form onSubmit={onSubmit} title="Register" />
	);
}

export default Register;